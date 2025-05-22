import React, { useContext, useEffect } from "react";

import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Skeleton from "../ui/Skeleton";
import Aos from "aos";

export default function SelectedCollection() {
  const { collection, loading } = useContext(AppContext);
  useEffect(() => {
    Aos.refresh();
  }, [collection]);

  return loading !== true ? (
    <header>
      <div data-aos="fade-up" className="selected-collection">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={collection.thumbnail}
          src={collection.videoLink}
          className="selected-collection__bg"
        />
        <div className="selected-collection__description">
          <img
            src={collection.logo}
            alt=""
            className="selected-collection__logo"
          />
          <h1 className="selected-collection__title">{collection.title}</h1>
          <Link
            to={`/user/${collection.creatorId}`}
            className="selected-collection__author"
          >
            By {collection.creator}
            <img
              src={VerifiedIcon}
              className="selected-collection__author__verified"
            />
          </Link>
          <div className="selected-collection__details">
            {collection.amountOfItems} Items · {collection.floorPrice} ETH
          </div>
          <Link
            to={`/collection/${collection.collectionId}`}
            className="selected-collection__button"
          >
            <div className="green-pulse"></div>
            View Collection
          </Link>
        </div>
      </div>
    </header>
  ) : (
    <Skeleton width="100vw" height="50vh" borderRadius="4px" />
  );
}
