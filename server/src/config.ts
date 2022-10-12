const CONFIG = {
  PORT: 4000,
  ENCRYPTED_PASSWORD_SALT: 5,
  RESET_PASSWORD_MAX_TRIES: 5,
  RESET_PASSWORD_SUBMIT_TRIES: 5,
  RESET_PASSWORD_EXPIRATION_TIME: 2,
  ENCRYPT_TEXT_KEY: 'alskjdalkjdaslkdjasd',
  TOKEN_SECRET_KEY: 'askdubhj9punpnn23qfwefASd',
  MONGO_URL:
    'mongodb://localhost:27017/test?readPreference=primary&directConnection=true&ssl=false',
};

export default CONFIG;
