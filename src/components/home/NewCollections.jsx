import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import MyCarousel from "../ui/MyCarousel";
import Skeleton from "../ui/Skeleton";

export default function NewCollections() {
  const { loading, newCollections } = useContext(AppContext);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
          <div className="new-collections__body">
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
                  : newCollections.map((newCollection, index) => (
                      <div key={index} className="item">
                        <Link
                          to={`/collection/${newCollection.collectionId}`}
                          className="collection"
                        >
                          <img
                            src={newCollection.imageLink}
                            alt={newCollection.title}
                            className="collection__img"
                          />
                          <div className="collection__info">
                            <h3 className="collection__name">
                              {newCollection.title}
                            </h3>
                            <div className="collection__stats">
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Floor
                                </span>
                                <span className="collection__stat__data">
                                  {(
                                    Math.round(newCollection.floor * 100) / 100
                                  ).toFixed(2)}{" "}
                                  ETH
                                </span>
                              </div>
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Total Volume
                                </span>
                                <span className="collection__stat__data">
                                  {newCollection.totalVolume.includes("K") ||
                                  newCollection.totalVolume.includes("M")
                                    ? newCollection.totalVolume
                                    : newCollection.totalVolume + "K"}{" "}
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
