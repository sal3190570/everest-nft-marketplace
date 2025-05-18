import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import MyCarousel from "../ui/MyCarousel";
import CollectionProp from "../ui/CollectionProp";
import CollectionSkeleton from "../ui/CollectionSkeleton";

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
              }}
            >
              <MyCarousel>
                {loading
                  ? new Array(6).fill(0).map((_, index) => (
                      <div key={index} className="item">
                        <CollectionSkeleton />
                      </div>
                    ))
                  : popularCollections.map((popularCollection, index) => (
                      <CollectionProp
                        key={popularCollection.collectionId || index}
                        collectionData={popularCollection}
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
