#Purpose of Nexora
Nexora is built to provide a modern, real-time community platform where users can engage in discussions, share ideas, and connect with like-minded individuals. The platform aims to enhance online interactions by offering:

  #Seamless Community Management – Users can create, join, and explore communities based on their interests.
  #Engaging Discussions – Members can start discussions, comment, and participate in meaningful conversations.
  #Voting System – Upvoting and downvoting help surface the most valuable content.
  #Real-Time Interactions – Live updates via WebSockets (Socket.io) for a dynamic experience.
  #Personalized Recommendations – Smart suggestions based on user activity.
  #Nexora is designed to be a scalable and user-friendly platform, making online communities more interactive, engaging, and efficient. 

#Tech Stack
Frontend: React, Tailwind CSS, Framer Motion
Backend: Node.js, Express, MongoDB
Real-time: Socket.io
Authentication: JWT

#Installation & Setup
git clone https://github.com/yourusername/nexora.git
cd nexora

#API Endpoints
POST   /api/auth/register  → User registration  
POST   /api/auth/login     → User login  
GET    /api/communities    → Fetch all communities  
POST   /api/posts          → Create a new post  
