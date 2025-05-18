import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IndividualCollectionContext } from "../../context/IndividualCollectionContext";

export default function CollectionHeader() {
  const { loading, individualCollection } = useContext(
    IndividualCollectionContext
  );

  return (
    <header
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), 
        url(${individualCollection?.imageLink})`,
      }}
      id="collection-header"
    >
      <div className="row collection-header__row">
        <div className="collection-header__content">
          <div className="collection-header__left">
            <img
              src={individualCollection?.logo}
              alt={individualCollection?.title}
              className="collection-header__img"
            />
            <div className="collection-header__name">
              {individualCollection?.title}
            </div>
            <Link to={"/user"} className="collection-header__author">
              {individualCollection?.creator}
            </Link>
          </div>
          <div className="collection-header__right">
            <div className="collection-header__columns">
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">
                    {individualCollection?.totalVolume}
                  </span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Total volume
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">
                    {individualCollection?.floor}
                  </span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Floor price
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">
                    {individualCollection?.bestOffer}
                  </span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Best offer
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">
                    {individualCollection?.listed}
                  </span>
                </span>
                <span className="collection-header__column__label">Listed</span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">
                    {individualCollection?.owners}
                  </span>
                </span>
                <span className="collection-header__column__label">
                  Owners (Unique)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
