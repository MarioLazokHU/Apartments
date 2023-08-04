import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../services/actions';

const Navbar = memo(({ onShowFavorites, onShowRegistration, onShowLogin, onLogout }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://devora-test-api.codeesa.com/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData); 
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const renderUserDetails = () => {
    if (!isLoading && userProfile) {
      return (
        <>
          <li>
            <p className="text-white text-sm"> {userProfile.fullName} <br /> {userProfile.email} </p>
          </li>
          <li>
            <button className="text-white" onClick={onShowFavorites}>Favorites</button>
          </li>
          <li>
            <button className="text-white" onClick={handleLogout}>Log Out</button>
          </li>
        </>
      );
    } else if (!isLoading && !user) {
      return (
        <>
          <li>
            <button className="text-white" onClick={handleLogin}>Login</button>
          </li>
          <li>
            <button className="text-white" onClick={onShowRegistration}>Registration</button>
          </li>
        </>
      );
    }
  };

  const handleLogin = () => {
    onShowLogin();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserProfile(null);
    onLogout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Fine Apartments</h1>
        <ul className="flex space-x-4">
          {renderUserDetails()}
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
