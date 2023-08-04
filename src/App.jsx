import React, { useState, memo } from "react";
import { Provider } from "react-redux";
import store from "./services/store";
import Navbar from "./components/Navbar";
import Apartments from "./components/Apartments";
import Favorites from "./components/Favorites";
import Registration from "./components/Registration";
import Login from "./components/Login";

const MemoNavbar = memo(Navbar);
const MemoFavorites = memo(Favorites);
const MemoRegistration = memo(Registration);
const MemoLogin = memo(Login);

function App() {
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteApartments, setFavoriteApartments] = useState([]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFavoriteApartments([]);
  };

  const showFavorites = () => setShowFavoritesModal(true);
  const showRegistration = () => setShowRegistrationModal(true);
  const showLogin = () => setShowLoginModal(true);
  const closeFavorites = () => setShowFavoritesModal(false);
  const closeRegistration = () => setShowRegistrationModal(false);
  const closeLogin = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <MemoNavbar
          onShowFavorites={showFavorites}
          onShowRegistration={showRegistration}
          onShowLogin={showLogin}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />

        <Apartments
          isLoggedIn={isLoggedIn}
          setFavoriteApartments={setFavoriteApartments}
          favoriteApartments={favoriteApartments}
        />

        {showFavoritesModal && (
          <MemoFavorites favoriteApartments={favoriteApartments} onClose={closeFavorites} />
        )}

        {showRegistrationModal && (
          <MemoRegistration onClose={closeRegistration} />
        )}

        {showLoginModal && (
          <MemoLogin onClose={closeLogin} />
        )}
      </div>
    </Provider>
  );
}

export default App;
