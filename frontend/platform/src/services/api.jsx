import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchCommunities = async () => {
  const response = await axios.get(`${API_URL}/communities`);
  return response.data;
};

export const fetchCommunityById = async (id) => {
  const response = await axios.get(`${API_URL}/communities/${id}`);
  return response.data;
};

export const fetchPosts = async (communityId) => {
  const response = await axios.get(`${API_URL}/posts?community=${communityId}`);
  return response.data;
};

export const joinCommunity = async (communityId) => {
  try {
    const response = await axios.post(
      `${API_URL}/communities/${communityId}/join`,
      {},
      { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Join community error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const leaveCommunity = async (communityId) => {
  const response = await axios.post(
    `${API_URL}/communities/${communityId}/leave`,
    {},
    { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
  );
  return response.data;
};

export const createPost = async (community, content, createdBy) => {
  console.log("Sending Post Data:", { community, content, createdBy });
  const response = await axios.post(
    `${API_URL}/posts`,
    {
      community,
      content,
      createdBy,
    },
    { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
  );
  return response.data;
};

// Update Post
export const updatePost = async (postId, content) => {
  const response = await axios.put(
    `${API_URL}/posts/${postId}`,
    { content },
    { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
  );
  return response.data;
};

// Delete Post
export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_URL}/posts/${postId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
