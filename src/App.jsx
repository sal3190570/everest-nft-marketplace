import Footer from "./components/Footer";
import Nav from "./components/Nav";
import CollectionPage from "./pages/CollectionPage";
import CollectionsPage from "./pages/CollectionsPage";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import UserPage from "./pages/UserPage";
import { AppContext } from "./context/appContext";
import { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newCollections, setNewCollections] = useState([]);
  const [popularCollections, setPopularCollections] = useState([]);
  const [collections, setCollections] = useState([]);

  async function fetchCollection() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/selectedCollection"
    );
    let collectionData = data.data;
    setCollection(collectionData);
  }

  async function fetchTrending() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/trendingNFTs"
    );
    let trendingData = data.data;
    setTrending(trendingData);
  }

  async function fetchNewCollections() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/newCollections"
    );
    let newCollectionsData = data.data;
    setNewCollections(newCollectionsData);
  }

  async function fetchPopularCollections() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/popularCollections"
    );
    let popularCollectionsData = data.data;
    setPopularCollections(popularCollectionsData);
  }

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/collections"
    );
    let collectionsData = data.data;
    setCollections(collectionsData);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCollection();
    fetchTrending();
    fetchNewCollections();
    fetchPopularCollections();
    fetchCollections();
  }, []);

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
          <Route path="/item" element={<ItemPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
