import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCommunities } from "../services/api";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const getCommunities = async () => {
      const data = await fetchCommunities();
      setCommunities(data);
    };
    getCommunities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Communities</h2>
          <Link
            to="/create-community"
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Create New Community
          </Link>
        </div>

        {/* Community List */}
        {communities.length === 0 ? (
          <p className="text-gray-600">No communities found.</p>
        ) : (
          <ul className="space-y-4">
            {communities.map((community) => (
              <li
                key={community._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {community.name}
                </h3>
                <p className="text-gray-600 mt-2">{community.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Members: {community.members}
                </p>
                {/* Navigation to Community Details Page */}
                <Link
                  to={`/community/${community._id}`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommunityList;
