import Footer from "./components/Footer";
import Nav from "./components/Nav";
import CollectionPage from "./pages/CollectionPage";
import CollectionsPage from "./pages/CollectionsPage";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import UserPage from "./pages/UserPage";
import { AppContext } from "./context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newCollections, setNewCollections] = useState([]);
  const [popularCollections, setPopularCollections] = useState([]);
  const [collections, setCollections] = useState([]);

  // Data fetching functions
  async function fetchCollection() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/selectedCollection"
    );
    setCollection(data.data);
  }

  async function fetchTrending() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/trendingNFTs"
    );
    setTrending(data.data);
  }

  async function fetchNewCollections() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/newCollections"
    );
    setNewCollections(data.data);
  }

  async function fetchPopularCollections() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/popularCollections"
    );
    setPopularCollections(data.data);
  }

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/collections"
    );
    setCollections(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCollection();
    fetchTrending();
    fetchNewCollections();
    fetchPopularCollections();
    fetchCollections();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      AOS.init({
        disable: false,
        startEvent: "DOMContentLoaded",
        initClassName: "aos-init",
        animatedClassName: "aos-animate",
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 50,
        delay: 0,
        duration: 600,
        easing: "ease",
        once: true,
        mirror: false,
        anchorPlacement: "top-bottom",
      });
      AOS.refreshHard();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  return (
    <AppContext.Provider
      value={{
        collection,
        trending,
        loading,
        newCollections,
        popularCollections,
        collections,
      }}
    >
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route
            path="/collection/:collectionId"
            element={<CollectionPage />}
          />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
