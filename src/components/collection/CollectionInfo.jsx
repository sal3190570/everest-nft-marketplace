import React, { useContext } from "react";
import { IndividualCollectionContext } from "../../context/IndividualCollectionContext";
import Skeleton from "../ui/Skeleton";

export default function CollectionInfo() {
  const { loading, individualCollection } = useContext(
    IndividualCollectionContext
  );

  return (
    <>
      {loading ? (
        <section id="collection-info">
          <div className="row">
            <div className="collection-info__wrapper">
              <div className="collection-info__description">
                <Skeleton width="100%" height="14px" borderRadius="4px" />
                <Skeleton width="100%" height="14px" borderRadius="4px" />
                <Skeleton width="75%" height="14px" borderRadius="4px" />
              </div>
              <div className="collection-info__details">
                <span className="collection-info__detail">
                  <Skeleton width="50px" height="14px" borderRadius="4px" />
                  <span className="collection-info__detail__data"></span>
                </span>
                <span className="collection-info__detail">
                  <Skeleton width="150px" height="14px" borderRadius="4px" />
                  <span className="collection-info__detail__data"></span>
                </span>
                <span className="collection-info__detail">
                  <Skeleton width="150px" height="14px" borderRadius="4px" />
                  <span className="collection-info__detail__data"></span>
                </span>

                <span className="collection-info__detail">
                  <Skeleton width="100px" height="14px" borderRadius="4px" />
                  <span className="collection-info__detail__data"></span>
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="collection-info">
          <div className="row">
            <div className="collection-info__wrapper">
              <p className="collection-info__description">
                {individualCollection?.description}
              </p>
              <div className="collection-info__details">
                <span className="collection-info__detail">
                  Items
                  <span className="collection-info__detail__data">
                    {" "}
                    {individualCollection?.items
                      ? individualCollection.items.length
                      : 0}
                  </span>
                </span>
                ·
                <span className="collection-info__detail">
                  Created
                  <span className="collection-info__detail__data">
                    {" "}
                    {individualCollection?.createdDate}
                  </span>
                </span>
                ·
                <span className="collection-info__detail">
                  Creator earnings
                  <span className="collection-info__detail__data">
                    {" "}
                    {individualCollection?.creatorEarnings}
                  </span>
                </span>
                ·
                <span className="collection-info__detail">
                  Chain
                  <span className="collection-info__detail__data">
                    {" "}
                    {individualCollection?.chain}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
