import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  { src: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1200", label: "Hong Kong" },
  { src: "https://images.unsplash.com/photo-1562992936-61ef77be4d07?w=1200", label: "Macao" },
  { src: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200", label: "Japan" },
  { src: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=1200", label: "Las Vegas" },
];

class CityCarousel extends React.Component {
  render() {
    return (
      <Carousel showArrows infiniteLoop autoPlay interval={3000}>
        {slides.map((slide) => (
          <div key={slide.label}>
            <img src={slide.src} alt={slide.label} />
            <p className="legend">{slide.label}</p>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default CityCarousel;