import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import CommunityList from "./components/CommunityList";
import CreateCommunity from "./components/CreateCommunity";
// import PostList from "./components/PostList";
import Chat from "./components/Chat";
import CommunityDetail from "./components/CommunityDetails";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/communities" element={<CommunityList />} />
            <Route path="/create-community" element={<CreateCommunity />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
