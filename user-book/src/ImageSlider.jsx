import Carousel from 'react-bootstrap/Carousel';
import slide1 from './assets/slide1.png';
import slide2 from './assets/slide2.png';
import slide3 from './assets/slide3.png';
import slide4 from './assets/slide4.png';

function ImageSlider() {
    const slides = [
        { src: slide1 },
        { src: slide2 },
        { src: slide3},
        { src: slide4 }
    ];

    return (
        <Carousel interval={3000} fade>
            {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                    <img
                        src={slide.src}
                        alt={slide.title}
                        className="d-block w-100"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.text}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ImageSlider;