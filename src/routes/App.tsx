import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Article, ArticleList, Editor, Login, Register, Logout, Profile, Settings } from "screens";
import Navbar from "../components/Navbar";
import Footer from "components/Footer";

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:slug" element={<Editor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/favorites" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/:slug" element={<Article />} />
          <Route path="/" element={<ArticleList />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
