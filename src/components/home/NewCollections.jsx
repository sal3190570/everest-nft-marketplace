import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import MyCarousel from "../ui/MyCarousel";

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
                overflow: "visible",
                padding: "0 2%",
              }}
            >
              <MyCarousel>
                {loading
                  ? new Array(6).fill(0).map((_, index) => (
                      <div key={index} className="item">
                        <div className="collection">
                          <img
                            src="https://i.seadn.io/gcs/files/a5414557ae405cb6233b4e2e4fa1d9e6.jpg?auto=format&dpr=1&w=1920"
                            alt="Loading..."
                            className="collection__img"
                          />
                          <div className="collection__info">
                            <h3 className="collection__name">Loading...</h3>
                            <div className="collection__stats">
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Floor
                                </span>
                                <span className="collection__stat__data">
                                  -- ETH
                                </span>
                              </div>
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Total Volume
                                </span>
                                <span className="collection__stat__data">
                                  -- ETH
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
