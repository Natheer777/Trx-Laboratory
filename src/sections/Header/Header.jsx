import './Header.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import slide1 from '../../assets/header/the-image-depicts-a-scene-within-a-modern-laboratory-bathed-in-a-dominant-light-blue-hue-that-gent.png'
import slide2 from '../../assets/header/the-image-depicts-a-scene-within-a-modern-laboratory-bathed-in-a-dominant-light-blue-hue-that-gent0.png'
import slide3 from '../../assets/header/the-image-depicts-a-scene-within-a-modern-laboratory-bathed-in-a-dominant-light-blue-hue-that-gent2.png'
export default function Header() {
      const slides = [
    {
      image: slide1,
    },
    {
      image: slide2,
    },
    {
      image: slide3,
    }
  ];
  return (
    <div className='header'>

       <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
              delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
              clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="header-swiper"
        //   onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="header-slide">
              <div className="slide-background">
                <img 
                  src={slide.image} 
                  alt={`Slide ${index + 1}`}
                  className="slide-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
              </div>
  )
}
