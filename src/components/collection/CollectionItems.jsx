import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IndividualCollectionContext } from "../../context/IndividualCollectionContext";

export default function CollectionItems() {
  const { loading, individualCollection } = useContext(
    IndividualCollectionContext
  );
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              <div className="green-pulse"></div>
              Live
            </span>
            <span className="collection-items__header__results">
              {individualCollection?.items
                ? individualCollection.items.length
                : 0}{" "}
              Results
            </span>
          </div>
          <select className="collection-items__header__sort">
            <option value="" default>
              Default
            </option>
            <option value="">Price high to low</option>
            <option value="">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div className="item-column" key={index}>
                  <Link to={"/item"} className="item">
                    <figure className="item__img__wrapper">
                      <img
                        src="https://i.seadn.io/gcs/files/0a085499e0f3800321618af356c5d36b.png?auto=format&dpr=1&w=384"
                        alt=""
                        className="item__img"
                      />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">Meebit #0001</span>
                      <span className="item__details__price">0.98 ETH</span>
                      <span className="item__details__last-sale">
                        Last sale: 7.45 ETH
                      </span>
                    </div>
                    <div className="item__see-more">
                      <button className="item__see-more__button">
                        See More
                      </button>
                      <div className="item__see-more__icon">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : individualCollection?.items
                .slice(0, visibleCount)
                .map((item, index) => (
                  <div className="item-column" key={index}>
                    <Link to={"/item"} className="item">
                      <figure className="item__img__wrapper">
                        <img
                          src={item.imageLink}
                          alt={item.title}
                          className="item__img"
                        />
                      </figure>
                      <div className="item__details">
                        <span className="item__details__name">
                          {item.title}
                        </span>
                        <span className="item__details__price">
                          {item.price}
                        </span>
                        <span className="item__details__last-sale">
                          Last sale: {item.lastSale} ETH
                        </span>
                      </div>
                      <div className="item__see-more">
                        <button className="item__see-more__button">
                          See More
                        </button>
                        <div className="item__see-more__icon">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
        </div>
      </div>
      {visibleCount < individualCollection?.items
        ? individualCollection.items.length
        : 0 && (
            <button
              className="collection-page__button"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
    </section>
  );
}
