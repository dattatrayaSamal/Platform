import React, { useEffect, useState } from "react";
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
    <div>
      <h2>Communities</h2>
      <ul>
        {communities.map((community) => {
          <li key={community._id}>{community.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default CommunityList;
