import { useState, useEffect } from "react";

// Array of image objects with src and alt
const images = [
  { src: "roundneck/c1.jpeg", alt: "Image 1" },
  { src: "roundneck/c2.jpg", alt: "Image 2" },
  { src: "roundneck/c3.jpg", alt: "Image 3" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // Start fade-in after the image change
      }, 300); // Duration of fade-out transition
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[550px] overflow-hidden mt-4 max-sm:h-[200px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            index === currentIndex ? (fade ? "opacity-100" : "opacity-0") : "opacity-0"
          }`}
        >
          <div className="container">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          </div>
        </div>
      ))}

      {/* Optional: Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
