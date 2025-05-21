import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../../context/ItemContext";
import MyCarousel from "../ui/MyCarousel";
import Skeleton from "../ui/Skeleton";

export default function RecommendedItems() {
  const { loading, itemId, recommendedItemsData } = useContext(ItemContext);

  const itemsArr = Array.isArray(recommendedItemsData?.items)
    ? recommendedItemsData.items
    : [];

  const carouselItems = itemsArr
    .filter((item) => item.itemId !== itemId)
    .slice(0, 10);

  return loading ? (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>
            <MyCarousel>
              {new Array(6).fill(0).map((_, index) => (
                <div className="carousel-slide" key={index}>
                  <figure className="item__img__wrapper">
                    <Skeleton height="100%" width="100%" borderRadius="4px" />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">
                      <Skeleton height="15px" width="75px" borderRadius="4px" />
                    </span>
                    <span className="item__details__price">
                      <Skeleton height="15px" width="40px" borderRadius="4px" />
                    </span>
                    <span className="item__details__last-sale">
                      <Skeleton
                        height="15px"
                        width="100px"
                        borderRadius="4px"
                      />
                    </span>
                  </div>
                  <div className="item__see-more">
                    <button className="item__see-more__button">See More</button>
                    <div className="item__see-more__icon">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                  </div>
                </div>
              ))}
            </MyCarousel>
          </div>
          <div
            className="recommended-items__footer"
            style={{ marginTop: "20px" }}
          >
            <Skeleton height="25px" width="150px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>
            <MyCarousel>
              {carouselItems.map((item) => (
                <div className="carousel-slide" key={item.itemId}>
                  <Link to={`/item/${item.itemId}`} className="item">
                    <figure className="item__img__wrapper">
                      <img
                        src={item.imageLink}
                        alt={item.title}
                        className="item__img"
                      />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">{item.title}</span>
                      <span className="item__details__price">
                        {item.price} ETH
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
            </MyCarousel>
          </div>
          <div className="recommended-items__footer">
            <Link
              to={`/collection/${recommendedItemsData?.id || ""}`}
              className="recommended-items__footer__button"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
