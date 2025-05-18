import React from "react";
import { Link } from "react-router-dom";

const CollectionProp = ({ collectionData }) => {
  return (
    <>
      <Link
        to={`/collection/${collectionData.collectionId}`}
        className="collection"
      >
        <img
          src={collectionData.imageLink}
          alt={collectionData.title}
          className="collection__img"
        />
        <div className="collection__info">
          <h3 className="collection__name">{collectionData.title}</h3>
          <div className="collection__stats">
            <div className="collection__stat">
              <span className="collection__stat__label">Floor</span>
              <span className="collection__stat__data">
                {(Math.round(collectionData.floor * 100) / 100).toFixed(2)} ETH
              </span>
            </div>
            <div className="collection__stat">
              <span className="collection__stat__label">Total Volume</span>
              <span className="collection__stat__data">
                {collectionData.totalVolume.includes("K") ||
                collectionData.totalVolume.includes("M")
                  ? collectionData.totalVolume
                  : collectionData.totalVolume + "K"}{" "}
                ETH
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CollectionProp;
