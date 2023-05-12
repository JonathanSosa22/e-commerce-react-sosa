import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    const updatedDarkMode = !darkMode;
    setDarkMode(updatedDarkMode);
    localStorage.setItem("darkMode", updatedDarkMode.toString());
    document.body.classList.toggle("dark-mode");
  };

  return (
    <nav className={darkMode ? "navbar-dark" : "navbar-light"}>
      <div className="navbar-left">
        <a href="/" className="navbar-brand">
          E-Commerce
        </a>
      </div>
      <div className="navbar-right">
        <a href="/login" className="navbar-icon">
          <i className="fas fa-user"></i>
        </a>
        <a href="/purchases" className="navbar-icon">
          <i className="fas fa-shopping-bag"></i>
        </a>
        <a href="/" className="navbar-icon">
          <i className="fas fa-shopping-cart"></i>
        </a>
        <button
          className={darkMode ? "dark-mode-button" : "light-mode-button"}
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
