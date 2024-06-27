import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function NavLink({ title, to }) {
  return (
    <div className = "navLink">
      <a href = {to}>{title}</a>
    </div>
  );
}

function NavBar({ currentUser }) {
  return (
    <div className = "navOuter">
      <nav>
        <div className = "navDiv">
          <NavLink title = "Home" to = "/home" />
          <NavLink title = "Profile" to = {"/profile/" + currentUser} />
          <NavLink title = "Play" to = "/play" />
        </div>
      </nav>
    </div>
  )
}

function LandingPage({ currentUser }) {
  return (
    <>
      <a></a>
      <a></a>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
