import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../store/slices/products.slice";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
      }
    }, [delay]);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useInterval(() => {
    goToNextImage();
  }, 3000);

  useEffect(() => {
    setIsPreviousDisabled(currentIndex === 0);
    setIsNextDisabled(
      currentIndex === products.length - 1 || currentIndex === 2
    );
  }, [currentIndex, products]);

  const goToPreviousImage = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextImage = () => {
    if (currentIndex === products.length - 1 || currentIndex === 2) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="home-content">
      {products.map((productItem) => (
        <div className="home-container" key={productItem.id}>
          <div>
            <h1>{productItem.title}</h1>
          </div>
          <div className="carousel-container">
            <button
              className="carousel-button"
              onClick={goToPreviousImage}
              disabled={isPreviousDisabled}
            >
              &lt;
            </button>
            <img
              className="carousel-image"
              src={productItem.productImgs[currentIndex]}
            />
            <button
              className="carousel-button"
              onClick={goToNextImage}
              disabled={isNextDisabled}
            >
              &gt;
            </button>
          </div>
          <div className="home-price-button">
            <div>
              <h2>Price: ${productItem.price}</h2>
            </div>
            <div>
              <button>
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <div>
            <Link to={`/products/${productItem.id}`}>
              <button>See Detail</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
