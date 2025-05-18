import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IndividualCollectionContext } from "../context/IndividualCollectionContext";

export default function CollectionPage() {
  const { collectionId } = useParams();
  const [individualCollection, setIndividualCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchIndividualCollection() {
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`
    );
    let individualCollectionData = data.data;
    setIndividualCollection(individualCollectionData);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchIndividualCollection();
  }, []);

  return (
    <IndividualCollectionContext.Provider
      value={{ loading, individualCollection }}
    >
      <CollectionHeader />
      <CollectionInfo />
      <CollectionItems />
    </IndividualCollectionContext.Provider>
  );
}
