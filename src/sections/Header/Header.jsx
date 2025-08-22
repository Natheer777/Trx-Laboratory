import { useState, useEffect } from 'react'
import './Header.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import slide1Pc from '../../assets/header/headerPc/the-image-depicts-a-scene-within-a-modern-laboratory-bathed-in-a-dominant-light-blue-hue-that-gent.png'
import slide2Pc from '../../assets/header/headerPc/the-image-depicts-a-scene-within-a-modern-laboratory-bathed-in-a-dominant-light-blue-hue-that-gent0.png'
import slide3Pc from '../../assets/header/headerPc/the-image-depicts-a-scene-within-a-modern-laboratory-bathed-in-a-dominant-light-blue-hue-that-gent2.png'
import slide1Mobile from '../../assets/header/headerMobile/Asset 2@8x.png'
import slide2Mobile from '../../assets/header/headerMobile/Asset 3@8x.png'
import slide3Mobile from '../../assets/header/headerMobile/Asset 4@8x.png'
import homeVideo from '../../assets/videoHome/home/0820(5).mp4'

// Custom hook لتحديد حجم الشاشة
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default function Header() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // تحديد الصور بناءً على حجم الشاشة
  const slides = isMobile ? [
    { image: slide1Mobile },
    { image: slide2Mobile },
    { image: slide3Mobile }
  ] : [
    { image: slide1Pc },
    { image: slide2Pc },
    { image: slide3Pc }
  ];

  return (
    <div className='header mb-4'>
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
        navigation={!isMobile} // إخفاء navigation في الموبايل
        modules={[Autoplay, Pagination, Navigation]}
        className="header-swiper"
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
          <div className="video-container ps-2 pe-2 mt-4">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="auth-video w-100"
                    style={{
                      maxWidth: '800px',
                      margin: '0 auto',
                      display: 'block',
                      borderRadius: '10px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <source src={homeVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
      
    </div>
  )
}