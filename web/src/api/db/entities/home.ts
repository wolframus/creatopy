import http from '../http';
import { EMainRoutes, ESecondaryRoutes } from '../types';
import { TPost, TSubmitFeedPost } from '../../../common.types';

export const getHomePosts = () => {
  const url = http.buildPath(EMainRoutes.Home, ESecondaryRoutes.GetPosts);

  return http.get<TPost[]>(url);
};

export const publishPost = (data: TSubmitFeedPost) => {
  const url = http.buildPath(EMainRoutes.Home, ESecondaryRoutes.PublishPost);

  return http.post<TPost>(url, data);
};
