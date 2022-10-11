import { Model, model, Schema } from 'mongoose';

import { TMongoPost } from '../../types/models/post';
import { parseDatabasePost, parseDatabasePosts } from '../static/post.static';

interface PostOverride extends Model<TMongoPost> {
  parseDatabasePost: typeof parseDatabasePost;
  parseDatabasePosts: typeof parseDatabasePosts;
}

const PostSchema = new Schema<TMongoPost, PostOverride>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'TestUser' },
  },
  { timestamps: true }
);

PostSchema.static('parseDatabasePost', parseDatabasePost);
PostSchema.static('parseDatabasePosts', parseDatabasePosts);

const PostModel = model<TMongoPost, PostOverride>('TestPost', PostSchema);

export default PostModel;
