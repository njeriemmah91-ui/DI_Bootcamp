import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = "YOUR_API_KEY";

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  const searchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = () => {
    if (!weather) return;

    const exists = favorites.find(
      (item) => item.id === weather.id
    );

    if (!exists) {
      const updatedFavorites = [
        ...favorites,
        weather
      ];

      setFavorites(updatedFavorites);

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      alert("Added To Favorites");
    }
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (item) => item.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  function WeatherPage() {
    return (
      <div className="container mt-5">
        <h1 className="mb-4">
          Weather App
        </h1>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city..."
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={searchWeather}
          >
            Search
          </button>
        </div>

        {weather && weather.main && (
          <div className="card mt-4 p-4 shadow">
            <h2>{weather.name}</h2>

            <h3>
              {weather.main.temp} °C
            </h3>

            <p>
              {weather.weather[0].description}
            </p>

            <button
              className="btn btn-success"
              onClick={addFavorite}
            >
              Add To Favorites
            </button>
          </div>
        )}
      </div>
    );
  }

  function FavoritesPage() {
    return (
      <div className="container mt-5">
        <h1>Favorite Cities</h1>

        <div className="row">
          {favorites.map((item) => (
            <div
              className="col-md-4 mt-3"
              key={item.id}
            >
              <div className="card p-3 shadow">
                <h3>{item.name}</h3>

                <h4>
                  {item.main.temp} °C
                </h4>

                <p>
                  {item.weather[0].description}
                </p>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    removeFavorite(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark p-3">
        <div className="container">
          <Link
            className="navbar-brand"
            to="/"
          >
            Weather App
          </Link>

          <div>
            <Link
              className="btn btn-light me-2"
              to="/"
            >
              Weather
            </Link>

            <Link
              className="btn btn-warning"
              to="/favorites"
            >
              Favorites
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<WeatherPage />}
        />

        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;