import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchCommunityById,
  fetchPosts,
  createPost,
  joinCommunity,
  leaveCommunity,
} from "../services/api";
import io from "socket.io-client";

const CommunityDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef(null); // ✅ Persistent socket connection

  useEffect(() => {
    const getCommunityData = async () => {
      try {
        const communityData = await fetchCommunityById(id);
        console.log("Fetched community data:", communityData); // Debugging log

        if (!communityData || typeof communityData !== "object") {
          throw new Error("Invalid community data");
        }

        const members = Array.isArray(communityData.members)
          ? communityData.members
          : []; // ✅ Ensure `members` is always an array
        setCommunity(communityData);
        setIsMember(members.includes(user?._id));

        const postsData = await fetchPosts(id);
        setPosts(postsData);
      } catch (err) {
        console.error("Error fetching community:", err);
        setError("Community not found");
      } finally {
        setLoading(false); // ✅ Fix loading issue
      }
    };
    getCommunityData();
  }, [id, user]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("chatMessage", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socketRef.current.emit("chatMessage", {
        user: user?.username,
        text: message,
      });
      setMessage("");
    }
  };

  const handleJoinCommunity = async () => {
    try {
      await joinCommunity(id);
      setIsMember(true);
      setCommunity((prev) => ({
        ...prev,
        members: [...prev.members, user._id],
      })); // ✅ Update UI instantly
    } catch (err) {
      console.error("Failed to join community:", err);
      setError("Could not join community. Please try again.");
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      await leaveCommunity(id);
      setIsMember(false);
      setCommunity((prev) => ({
        ...prev,
        members: prev.members.filter((member) => member !== user._id),
      })); // ✅ Update UI instantly
    } catch (err) {
      console.error("Failed to leave community:", err);
      setError("Could not leave community.");
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    console.log("🟢 User ID Before Posting:", user?._id); // ✅ Debugging user ID

    if (!user?._id) {
      console.error("❌ User ID is missing! Authentication issue?");
      setError("User authentication error. Please log in again.");
      return;
    }
  
    try {
      const newPost = await createPost(id, postContent, user?._id);
      
      // Update UI instantly
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setPostContent("");
    } catch (err) {
      console.error("Failed to create post:", err);
      setError("Failed to create post. Please try again.");
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Community not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">{community.name}</h2>
        <p className="text-gray-600">{community.description}</p>

        {!isMember && (
          <button
            onClick={handleJoinCommunity}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-700 transition-all"
          >
            Join Community
          </button>
        )}

        
          <form onSubmit={handlePostSubmit} className="mt-6">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share something..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              rows="4"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded mt-2 hover:bg-gray-700 transition-all"
            >
              Post
            </button>
          </form>
        

        <h3 className="text-2xl font-semibold mt-6">Posts</h3>
        <ul className="mt-4 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post._id} className="bg-white p-4 rounded-lg shadow">
                <p>{post.content}</p>
                <span className="text-sm text-gray-500">By {post.author}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">
              No posts yet. Be the first to share!
            </p>
          )}
        </ul>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold">Community Chat</h3>
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <ul className="space-y-2">
              {chatMessages.map((msg, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{msg.user}:</strong> {msg.text}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-gray-800 text-white px-4 py-2 rounded mt-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
