import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

const API_KEY = "YOUR_PEXELS_API_KEY";

function Header() {
  return (
    <div style={styles.header}>
      <h1>Snap Shot</h1>
    </div>
  );
}

function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/search/${search}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.searchForm}>
      <input
        type="text"
        placeholder="Search images..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
}

function Nav() {
  const categories = ["Mountain", "Beaches", "Birds", "Food"];

  return (
    <div style={styles.nav}>
      {categories.map((item) => (
        <Link key={item} to={`/category/${item}`} style={styles.link}>
          {item}
        </Link>
      ))}
    </div>
  );
}

function Gallery({ images }) {
  return (
    <div style={styles.gallery}>
      {images.map((img) => (
        <div key={img.id} style={styles.card}>
          <img
            src={img.src.medium}
            alt={img.photographer}
            style={styles.image}
          />
        </div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div>
      <Header />
      <Search />
      <Nav />
    </div>
  );
}

function Category() {
  const { name } = useParams();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [name, page]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${name}&per_page=30&page=${page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      setImages(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <Search />
      <Nav />

      <h2 style={styles.title}>{name}</h2>

      <Gallery images={images} />

      <div style={styles.pagination}>
        <button
          style={styles.button}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Previous
        </button>

        <button
          style={styles.button}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function SearchPage() {
  const { query } = useParams();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      setImages(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <Search />
      <Nav />

      <h2 style={styles.title}>{query}</h2>

      <Gallery images={images} />

      <div style={styles.pagination}>
        <button
          style={styles.button}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Previous
        </button>

        <button
          style={styles.button}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  header: {
    textAlign: "center",
    padding: "20px",
    background: "#111",
    color: "white",
  },

  searchForm: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    gap: "10px",
  },

  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid gray",
  },

  button: {
    padding: "10px 20px",
    border: "none",
    background: "#111",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  link: {
    textDecoration: "none",
    background: "#111",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
  },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },

  card: {
    overflow: "hidden",
    borderRadius: "10px",
  },

  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    transition: "0.5s",
  },

  title: {
    textAlign: "center",
    marginTop: "20px",
    textTransform: "capitalize",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
};

export default App;