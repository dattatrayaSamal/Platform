import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

export const fetchCommunities = async () => {
  const response = await axios.get(`${API_URL}/communities`);
  return response.data;
};

export const fetchPosts = async (communityId) => {
  const response = await axios.get(`${API_URL}/posts?community=${communityId}`);
  return response.data;
};

export const createPost = async (communityId, content) => {
  const response = await axios.post(
    `${API_URL}/posts`,
    {
      communityId,
      content,
    },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
