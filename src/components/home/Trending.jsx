import { useContext, useEffect } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Skeleton from "../ui/Skeleton";
import Aos from "aos";

export default function Trending() {
  const { trending, loading } = useContext(AppContext);
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        Aos.refreshHard();
      }, 100); 
      return () => clearTimeout(timeout);
    }
  }, [loading, trending]);

  return loading !== true ? (
    <section id="trending" key={loading ? "loading" : "loaded"}>
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2
              className="trending__header__title"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Trending NFTs
            </h2>
            <Link
              className="trending__header__button"
              to={`/collections`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div
                className="trending-column__header"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending?.slice(0, 5).map((product, index) => (
                  <Link
                    to={`/collection/${product.collectionId}`}
                    key={index}
                    className="trending-collection"
                    data-aos="fade-up"
                    data-aos-delay={200 + index * 50}
                    data-aos-duration="600"
                  >
                    <div className="trending-collection__rank">
                      {product?.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={product?.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {product?.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {(Math.round(product.floor * 100) / 100).toString()
                          .length >= 4
                          ? Math.round(product.floor * 100) / 100
                          : Math.round(product.floor * 100) / 100 + "0"}{" "}
                        ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {product?.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="trending-column">
              <div
                className="trending-column__header trending-column__header2"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending?.slice(5, 10).map((product, index) => (
                  <Link
                    to={`/collection/${product.collectionId}`}
                    key={index}
                    className="trending-collection"
                    data-aos="fade-up"
                    data-aos-delay={200 + index * 50}
                    data-aos-duration="600"
                  >
                    <div className="trending-collection__rank">
                      {product?.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={product?.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {product?.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {(Math.round(product.floor * 100) / 100).toString()
                          .length >= 4
                          ? Math.round(product.floor * 100) / 100
                          : Math.round(product.floor * 100) / 100 + "0"}{" "}
                        ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {product?.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <div></div>
            <div></div>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="trending-column__body">
                {new Array(5).fill(0).map((_, index) => (
                  <div className="trending-collection" key={index}>
                    <div className="trending-collection__rank">{index + 1}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <Skeleton
                          width="100%"
                          height="100%"
                          borderRadius="4px"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        <Skeleton
                          width="120px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="trending-column__body">
                {new Array(5).fill(0).map((_, index) => (
                  <div className="trending-collection" key={index}>
                    <div className="trending-collection__rank">{index + 1}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <Skeleton
                          width="100%"
                          height="100%"
                          borderRadius="4px"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        <Skeleton
                          width="120px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        <Skeleton
                          width="70px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
