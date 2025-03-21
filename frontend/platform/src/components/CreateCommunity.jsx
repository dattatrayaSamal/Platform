import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState(0); // Add members state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/communities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, members }), // Include members in the request
      });

      if (!response.ok) {
        throw new Error("Failed to create community");
      }

      const data = await response.json();
      console.log("Community created:", data);
      setError("");
      setName("");
      setDescription("");
      setMembers(0); // Reset members to 0
      alert("Community created successfully!");

      navigate("/communities");
    } catch (error) {
      console.error("Error creating community:", error);
      setError("Failed to create community. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create a New Community
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-6">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Enter community name"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Enter community description"
              rows="4"
              required
            />
          </div>

          {/* Members Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Members:
            </label>
            <input
              type="number"
              value={members}
              onChange={(e) => setMembers(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Enter initial number of members"
              min="0"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;
