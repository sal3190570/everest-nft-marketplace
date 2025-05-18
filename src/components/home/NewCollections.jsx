import React, { useContext } from "react";

import { AppContext } from "../../context/appContext";
import MyCarousel from "../ui/MyCarousel";
import Skeleton from "../ui/Skeleton";
import CollectionProp from "../ui/CollectionProp";
import CollectionSkeleton from "../ui/CollectionSkeleton";

export default function NewCollections() {
  const { loading, newCollections } = useContext(AppContext);
  console.log(newCollections);
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
                margin: "0 auto",
              }}
            >
              <MyCarousel>
                {loading
                  ? new Array(6).fill(0).map((_, index) => (
                      <div key={index} className="item">
                        <CollectionSkeleton />
                      </div>
                    ))
                  : newCollections.map((newCollection, index) => (
                      <CollectionProp
                        key={newCollection.collectionId || index}
                        collectionData={newCollection}
                      />
                    ))}
              </MyCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
