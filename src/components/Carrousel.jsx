import { useEffect, useRef, useState } from "react";

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
  setIsNextDisabled(currentIndex === products.length - 1 || currentIndex === 2);
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

const Carrousel = () => {
  return (
    <div className="carousel-container">
      <button
        className="carousel-button"
        onClick={goToPreviousImage}
        disabled={isPreviousDisabled}
      >
        &lt;
      </button>
      <img className="carousel-image" src={img[currentIndex]} />
      <button
        className="carousel-button"
        onClick={goToNextImage}
        disabled={isNextDisabled}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carrousel;
