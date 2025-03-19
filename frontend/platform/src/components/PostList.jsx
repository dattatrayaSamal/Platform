import React, { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";

const PostList = ({ communityId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(communityId);
      setPosts(data);
    };
    getPosts();
  }, [communityId]);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
