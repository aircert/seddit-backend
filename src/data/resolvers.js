import {
  Posts,
  Authors
} from './data';
import { find, filter } from 'lodash';

const resolverMap = {
  Query: {
    authors() {
      return Authors;
    },
    posts() {
      return Posts;
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(Posts, { id: parseInt(postId, 10) });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
    addPost(_, post) {
      const newPost = {
        id: Posts.length + 1,
        title: post.title,
        authorId: post.authorId,
        votes: 1
      }
      console.log(newPost);
      Posts.push(newPost);
      return newPost;
    }
  },
  Author: {
    posts(author) {
      return filter(Posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return find(Authors, { id: post.authorId });
    },
  },
};

export default resolverMap;