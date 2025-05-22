import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/appContext";
import MyCarousel from "../ui/MyCarousel";
import CollectionProp from "../ui/CollectionProp";
import CollectionSkeleton from "../ui/CollectionSkeleton";
import Aos from "aos";

export default function NewCollections() {
  const { loading, newCollections } = useContext(AppContext);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        Aos.refreshHard();
      }, 100); 
      return () => clearTimeout(timeout);
    }
  }, [loading, newCollections]);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2
            className="new-collections__title"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-once="false"
          >
            New Collections
          </h2>
          <div
            className="new-collections__body"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="false"
          >
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
                        collectionData={newCollection}
                        key={newCollection.collectionId || index}
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
