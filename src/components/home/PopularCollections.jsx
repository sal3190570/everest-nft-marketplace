import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import MyCarousel from "../ui/MyCarousel";
import Skeleton from "../ui/Skeleton";

export default function PopularCollections() {
  const { loading, popularCollections } = useContext(AppContext);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>
          <div className="popular-collections__body">
            <div
              className="collection-column"
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <MyCarousel>
                {loading
                  ? new Array(6).fill(0).map((_, index) => (
                      <div key={index} className="item">
                        <div className="collection">
                          <Skeleton
                            height="180px"
                            width="100%"
                            borderRadius="4px"
                          />
                          <div className="collection__info">
                            <h3 className="collection__name"></h3>
                            <div className="collection__stats--skeleton">
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  <Skeleton
                                    height="18px"
                                    width="35%"
                                    borderRadius="4px"
                                  />
                                </span>
                                <span className="collection__stat__data">
                                  <Skeleton
                                    height="18px"
                                    width="75%"
                                    borderRadius="4px"
                                  />
                                </span>
                              </div>
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  <Skeleton
                                    height="18px"
                                    width="35%"
                                    borderRadius="4px"
                                  />
                                </span>
                                <span className="collection__stat__data">
                                  <Skeleton
                                    height="18px"
                                    width="75%"
                                    borderRadius="4px"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : popularCollections.map((popularCollection, index) => (
                      <div key={index} className="item">
                        <Link
                          to={`/collection/${popularCollection.collectionId}`}
                          className="collection"
                        >
                          <img
                            src={popularCollection.imageLink}
                            alt=""
                            className="collection__img"
                          />
                          <div className="collection__info">
                            <h3 className="collection__name">
                              {popularCollection.title}
                            </h3>
                            <div className="collection__stats">
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Floor
                                </span>
                                <span className="collection__stat__data">
                                  {(
                                    Math.round(popularCollection.floor * 100) /
                                    100
                                  ).toFixed(2)}{" "}
                                  ETH
                                </span>
                              </div>
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Total Volume
                                </span>
                                <span className="collection__stat__data">
                                  {popularCollection.totalVolume.includes(
                                    "K"
                                  ) ||
                                  popularCollection.totalVolume.includes("M")
                                    ? popularCollection.totalVolume
                                    : popularCollection.totalVolume + "K"}{" "}
                                  ETH
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
              </MyCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
