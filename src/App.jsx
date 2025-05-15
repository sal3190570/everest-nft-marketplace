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

function App() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState();
  const [trending, setTrending] = useState([]);

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

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    fetchCollection();
    fetchTrending();
  }, []);

  return (
    <AppContext.Provider value={{ collection, trending, loading }}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collection/:id" element={<CollectionPage />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
