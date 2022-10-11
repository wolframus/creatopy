import mongoose from 'mongoose';

import CONFIG from '../config';

class MongoDb {
  private initialized = false;

  async connect() {
    if (this.initialized) return;

    await mongoose.connect(CONFIG.MONGO_URL, this.onDbConnect);
  }

  private onDbConnect = (error?: any | null) => {
    if (error) {
      console.error('Mongoose Error: ', error);
    } else {
      console.info('Mongoose Connected!');
      this.initialized = true;
    }
  };
}

export default new MongoDb();
