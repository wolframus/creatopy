import Queries from '../queries';
import { TPublishPost } from '../types/authentication.types';
import injectRequestTypes from '../../infrastructure/utils/injectRequestTypes';

export const GetPosts = injectRequestTypes.get(async (req, res) => {
  try {
    const posts = await Queries.Home.GetPosts();
    res.send(posts);
  } catch (err: any) {
    console.error('Error: ', err.message);
    res.status(500).send(err.message);
  }
});

export const PublishPost = injectRequestTypes.post<TPublishPost>(
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.id;

      const cratedPost = await Queries.Home.CreatePost({
        title,
        description,
        userId,
      });

      res.send(cratedPost);
    } catch (err: any) {
      console.error('Error: ', err.message);
      res.status(500).send(err.message);
    }
  }
);
