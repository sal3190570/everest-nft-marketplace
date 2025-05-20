import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ItemContext } from "../context/ItemContext";

export default function ItemPage() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [itemId, setItemId] = useState("");
  const { id } = useParams();
  const [hours, setHours] = useState("2h");
  const [minutes, setMinutes] = useState("38m");
  const [seconds, setSeconds] = useState("59s");
  const [recommendedItemsData, setRecommendedItemsData] = useState({});
  const [timeRemainingMillis, setTimeRemainingMillis] = useState(null);

  const animationFrameId = useRef(null);

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/item/${id}`
      );
      const itemData = data.data;
      setItem(itemData);
      setTimeRemainingMillis(itemData.expiryDate);
      setItemId(itemData.id);
      if (itemData.collectionId) {
        const { data: recData } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${itemData.collectionId}`
        );
        setRecommendedItemsData(recData.data);
      } else {
        setRecommendedItemsData({});
      }
    } catch (error) {
      console.error("Error fetching item or recommended items:", error);
      setRecommendedItemsData({});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [id]);

  useEffect(() => {
    if (!timeRemainingMillis) return;

    function updateTimer() {
      const now = Date.now();
      let timeRemainingSeconds = (timeRemainingMillis - now) / 1000;
      timeRemainingSeconds = Math.max(0, timeRemainingSeconds);

      const hoursVal = Math.floor(timeRemainingSeconds / 3600);
      const minutesVal = Math.floor((timeRemainingSeconds % 3600) / 60);
      const secondsVal = Math.floor(timeRemainingSeconds % 60);

      setHours(hoursVal);
      setMinutes(minutesVal);
      setSeconds(secondsVal);

      if (timeRemainingSeconds > 0) {
        animationFrameId.current = requestAnimationFrame(updateTimer);
      }
    }

    animationFrameId.current = requestAnimationFrame(updateTimer);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [timeRemainingMillis]);

  return (
    <ItemContext.Provider value={{ loading, recommendedItemsData, itemId }}>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="item-page__img__icon"
                  />
                  <div className="item-page__img__likes">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="item-page__img__icon"
                    />
                    <span className="item-page__img__likes__text">
                      {loading ? "11" : item.favorites}
                    </span>
                  </div>
                </div>
                <img
                  src={
                    loading
                      ? "https://i.seadn.io/gcs/files/0a085499e0f3800321618af356c5d36b.png?auto=format&dpr=1&w=1000"
                      : item.imageLink
                  }
                  alt=""
                  className="item-page__img"
                />
              </figure>
            </div>
            <div className="item-page__right">
              <Link
                to={
                  loading ? "/collection" : `/collection/${item.collectionId}`
                }
                className="item-page__collection light-blue"
              >
                {loading ? "Meebits" : item.collection}
              </Link>
              <h1 className="item-page__name">
                {loading ? "Meebit #18854" : item.title}
              </h1>
              <span className="item-page__owner">
                Owned by{" "}
                <Link
                  to={loading ? "/user" : `/user/${item.ownerId}`}
                  className="light-blue item-page__owner__link"
                >
                  {loading ? "shilpixels" : item.owner}
                </Link>
              </span>
              <div className="item-page__details">
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">
                    {loading ? "324" : item.views} views
                  </span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">
                    {loading ? "11" : item.favorites} favorites
                  </span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faShapes}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">PFPs</span>
                </div>
              </div>
              <div className="item-page__sale">
                <div className="item-page__sale__header">
                  <div className="green-pulse"></div>
                  <span>
                    Sale ends in{" "}
                    <span className="timer__hours">
                      {loading ? "2" : hours}h{" "}
                    </span>
                    <span className="timer__minutes">
                      {loading ? "30" : minutes}m{" "}
                    </span>
                    <span className="timer__seconds">
                      {loading ? "56" : seconds}s
                    </span>
                  </span>
                </div>
                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">Current price</span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">
                      {loading ? "100" : item.ethPrice} ETH
                    </span>
                    <span className="item-page__sale__price__dollars">
                      {loading ? "$314,884.00" : item.usdPrice}
                    </span>
                  </div>
                  <div className="item-page__sale__buttons">
                    <div className="item-page__sale__buy">
                      <button className="item-page__sale__buy__button disabled">
                        Buy now
                      </button>
                      <button className="item-page__sale__buy__icon disabled">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </button>
                    </div>
                    <button className="item-page__sale__offer disabled">
                      <FontAwesomeIcon icon={faTag} />
                      Make offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RecommendedItems />
    </ItemContext.Provider>
  );
}
