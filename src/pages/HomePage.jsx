import React from "react";
import SelectedCollection from "../components/home/SelectedCollection.jsx";
import NewCollections from "../components/home/NewCollections.jsx";
import PopularCollections from "../components/home/PopularCollections.jsx";
import Trending from "../components/home/Trending.jsx";

export default function HomePage() {
  return (
    <>
      <SelectedCollection />
      <Trending />
      <NewCollections />
      <PopularCollections />
    </>
  );
}
