import { useEffect, useState } from "react";

const Communities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/communities")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched from frontend:", data); // Debugging log
        setCommunities(data); // Store data in state
      })
      .catch((err) => console.error("Frontend fetch error:", err));
  }, []);

  return (
    <div>
      <h2>Communities</h2>
      {communities.length === 0 ? (
        <p>No communities found.</p>
      ) : (
        <ul>
          {communities.map((community) => (
            <li key={community._id}>
              <h3>{community.name}</h3>
              <p>{community.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Communities;
