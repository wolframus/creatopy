import PostModel from '../models/post';
import { TMongoPostPopulated } from '../../types/models/post';

export const GetPosts = async () => {
  const rawPosts: TMongoPostPopulated[] = await PostModel.find()
    .populate('user')
    .lean();
  const posts = PostModel.parseDatabasePosts(rawPosts);
  return posts;
};

export const CreatePost = async ({
  title,
  description,
  userId,
}: {
  userId: string;
  title: string;
  description: string;
}) => {
  const { _id } = await PostModel.create({
    description,
    title,
    user: userId,
  });
  const rawCreatedPost: TMongoPostPopulated = await PostModel.findById(_id)
    .populate('user')
    .lean();

  const cratedPost = PostModel.parseDatabasePost(rawCreatedPost);
  return cratedPost;
};
