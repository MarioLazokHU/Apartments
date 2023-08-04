import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import apartmentsData from "../data/apartmentsData";

const Apartment = React.memo(
  ({
    apartment,
    isLoggedIn,
    favoriteApartments,
    handleToggleFavorite,
    handleRemoveFavorite,
    isFetchingFavorites,
  }) => {
    const isFavorite = favoriteApartments.includes(apartment.id);

    return (
      <li className="bg-white shadow-md p-4">
        <img
          src={apartment.image}
          alt={`Apartment in ${apartment.city}`}
          className="mb-2 w-full h-32 object-cover"
        />
        <h3 className="text-lg font-semibold">{apartment.city}</h3>
        <p className="text-gray-600">${apartment.dailyRate} / day</p>
        <p className="text-gray-600">{apartment.squareMeters} sqm</p>
        <button
          className={"mt-2 px-2 py-1"}
          onClick={() =>
            isLoggedIn
              ? isFavorite
                ? handleRemoveFavorite(apartment.id)
                : handleToggleFavorite(apartment.id)
              : null
          }
          disabled={!isLoggedIn || isFetchingFavorites}
        >
          {isLoggedIn ? (
            isFavorite ? (
              <Favorite className="mr-1" />
            ) : (
              <FavoriteBorder className="mr-1" />
            )
          ) : (
            "Log In"
          )}
        </button>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isLoggedIn === nextProps.isLoggedIn &&
      prevProps.favoriteApartments === nextProps.favoriteApartments &&
      prevProps.isFetchingFavorites === nextProps.isFetchingFavorites &&
      prevProps.apartment.id === nextProps.apartment.id
    );
  }
);

const Apartments = ({
  isLoggedIn,
  setFavoriteApartments,
  favoriteApartments,
}) => {
  const user = useSelector((state) => state.user);
  const accessToken = user?.accessToken;

  const [isFetchingFavorites, setIsFetchingFavorites] = useState(true);

  const fetchFavoriteApartments = useCallback(async () => {
    try {
      if (!accessToken) {
        console.error("Access token is missing. Please log in first.");
        setIsFetchingFavorites(false);
        return;
      }

      const response = await fetch(
        "https://devora-test-api.codeesa.com/api/apartments/favorites",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setFavoriteApartments(data.map((apartment) => apartment.id));
      } else {
        console.error("Fetching favorite apartments failed.");
      }
    } catch (error) {
      console.error("Fetching favorite apartments error:", error);
    } finally {
      setIsFetchingFavorites(false);
    }
  }, [accessToken, setFavoriteApartments]);

  useEffect(() => {
    if (accessToken) {
      fetchFavoriteApartments();
    } else {
      setIsFetchingFavorites(false);
    }
  }, [accessToken, fetchFavoriteApartments]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavoriteApartments();
    }
  }, [accessToken, isLoggedIn, fetchFavoriteApartments]);

  const handleToggleFavorite = async (id) => {
    if (!accessToken) {
      console.error("Access token is missing. Please log in first.");
      return;
    }

    try {
      const response = await fetch(
        `https://devora-test-api.codeesa.com/api/apartments/add-favorite/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFavoriteApartments((prevFavorites) => [...prevFavorites, id]);
      } else {
        console.error("Toggle favorite failed.");
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    if (!accessToken) {
      console.error("Access token is missing. Please log in first.");
      return;
    }

    try {
      const response = await fetch(
        `https://devora-test-api.codeesa.com/api/apartments/remove-favorite/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFavoriteApartments((prevFavorites) =>
          prevFavorites.filter((apartmentId) => apartmentId !== id)
        );
      } else {
        console.error("Remove favorite failed.");
      }
    } catch (error) {
      console.error("Remove favorite error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Apartments</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {React.useMemo(
          () =>
            apartmentsData.map((apartment) => (
              <Apartment
                key={apartment.id}
                apartment={apartment}
                isLoggedIn={isLoggedIn}
                favoriteApartments={favoriteApartments}
                handleToggleFavorite={handleToggleFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                isFetchingFavorites={isFetchingFavorites}
              />
            )),
          [
            isLoggedIn,
            favoriteApartments,
            handleToggleFavorite,
            handleRemoveFavorite,
            isFetchingFavorites,
          ]
        )}
      </ul>
    </div>
  );
};

export default Apartments;
