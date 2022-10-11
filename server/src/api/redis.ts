import * as redis from 'redis';

import CONFIG from '../config';

const KEYS = {
  emailCodeReset: '-email-code-reset',
  emailCodeResetAmount: '-email-code-reset-amount',
  emailResetSubmitTries: '-email-reset-submit-tries',
  emailResetPasswordSubmitTries: '-reset-password-submit-tries',
};

class Redis {
  protected client: redis.RedisClientType | null = null;
  private initialized = false;

  constructor() {
    this.connect();
  }

  allowSubmitResetPassword = async (email: string) => {
    const emailResetSubmitTriesKey = `${email}${KEYS.emailResetSubmitTries}`;

    const amount = await this.getAmount(emailResetSubmitTriesKey);

    if (amount >= CONFIG.RESET_PASSWORD_SUBMIT_TRIES) {
      return false;
    }

    await this.client?.set(emailResetSubmitTriesKey, amount + 1, {
      EX: CONFIG.RESET_PASSWORD_EXPIRATION_TIME * 60,
    });

    return true;
  };

  getResetPasswordCode = async (
    email: string,
    skipValidation?: boolean
  ): Promise<{ value?: string | null; rejected: boolean }> => {
    if (skipValidation) {
      const value = await this.client?.get(`${email}${KEYS.emailCodeReset}`);
      return { rejected: false, value };
    }

    const resetPasswordTriesKey = `${email}${KEYS.emailResetPasswordSubmitTries}`;

    const amount = await this.getAmount(resetPasswordTriesKey);

    if (amount >= CONFIG.RESET_PASSWORD_SUBMIT_TRIES) {
      return { rejected: true, value: null };
    }

    await this.client?.set(resetPasswordTriesKey, amount + 1, {
      EX: CONFIG.RESET_PASSWORD_EXPIRATION_TIME * 60,
    });

    const value = await this.client?.get(`${email}${KEYS.emailCodeReset}`);

    return { rejected: false, value };
  };

  setResetPasswordCode = async (
    email: string,
    hashedPassword: string
  ): Promise<boolean> => {
    const amount = await this.getTryAmountToResetPasswordCode(email);

    if (amount >= CONFIG.RESET_PASSWORD_MAX_TRIES) {
      return false;
    }

    await Promise.all([
      this.client?.set(`${email}${KEYS.emailCodeReset}`, hashedPassword, {
        EX: CONFIG.RESET_PASSWORD_EXPIRATION_TIME * 60,
      }),
      this.increaseTryAmountToResetPasswordCode(email),
    ]);

    return true;
  };

  private async connect() {
    if (this.initialized) return;

    this.client = await redis.createClient({ url: 'redis://localhost:6379' });

    this.client.on('error', this.handleError);
    this.client.on('connect', this.handleConnect);

    await this.client.connect();
    this.initialized = true;
  }

  private increaseTryAmountToResetPasswordCode = async (email: string) => {
    let currentAmount = await this.getTryAmountToResetPasswordCode(email);

    ++currentAmount;

    await this.client?.set(
      `${email}${KEYS.emailCodeResetAmount}`,
      currentAmount.toString(),
      {
        EX: CONFIG.RESET_PASSWORD_EXPIRATION_TIME * 60,
      }
    );
  };

  private handleError = (err: any) => {
    if (
      typeof err?.message === 'string' &&
      err.message.includes('Socket closed unexpectedly')
    ) {
      return;
    }

    console.error(err.message);
  };

  private handleConnect = () => console.info('Redis Connected!');

  private getTryAmountToResetPasswordCode = async (email: string) =>
    this.getAmount(`${email}${KEYS.emailCodeResetAmount}`);

  protected getAmount = async (key: string) => {
    const amount = await this.client?.get(key);
    return amount ? +amount : 0;
  };
}

export default new Redis();
