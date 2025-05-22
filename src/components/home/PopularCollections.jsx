import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import MyCarousel from "../ui/MyCarousel";
import CollectionProp from "../ui/CollectionProp";
import CollectionSkeleton from "../ui/CollectionSkeleton";
import Aos from "aos";

export default function PopularCollections() {
  const { loading, popularCollections } = useContext(AppContext);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        Aos.refreshHard();
      }, 100); 
      return () => clearTimeout(timeout);
    }
  }, [loading, popularCollections]);
  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2
            className="popular-collections__title"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-once="false"
          >
            Popular Collections
          </h2>
          <div
            className="popular-collections__body"
            data-aos="fade-up"
            data-aos-delay="800"
            data-aos-once="false"
          >
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
