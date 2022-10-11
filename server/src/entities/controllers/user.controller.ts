import injectRequestTypes from '../../infrastructure/utils/injectRequestTypes';

export const GetMe = injectRequestTypes.get(async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err: any) {
    console.error('Error: ', err.message);
    res.status(500).send(err.message);
  }
});
