import React from "react";
import apartments from "../data/apartmentsData";

const FavoriteApartment = React.memo(({ apartment }) => (
  <li className="bg-white shadow-md p-4">
    <img
      src={apartment.image}
      alt={`Apartment in ${apartment.city}`}
      className="mb-2 w-full h-32 object-cover"
    />
    <h3 className="text-lg font-semibold">{apartment.city}</h3>
    <p className="text-gray-600">${apartment.dailyRate} / day</p>
    <p className="text-gray-600">{apartment.squareMeters} sqm</p>
  </li>
));

const Favorites = React.memo(({ favoriteApartments, onClose }) => {
  const favoriteApartmentsData = React.useMemo(
    () =>
      apartments.filter((apartment) =>
        favoriteApartments.includes(apartment.id)
      ),
    [favoriteApartments]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Favorites</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="max-h-82 overflow-y-auto">
          <ul className="space-y-4">
            {favoriteApartmentsData.map((apartment) => (
              <FavoriteApartment key={apartment.id} apartment={apartment} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Favorites;
