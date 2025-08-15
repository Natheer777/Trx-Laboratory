import './Comments.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaStar } from "react-icons/fa";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Comments() {
  return (
    <div className="comment-section container mt-5">
      <h3 className="comment-title">What Our Customer Says</h3>
      <h1>Our Testomonials
      </h1>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="comment-card">
            <img src="https://i.pravatar.cc/100?img=12" alt="User" className="user-img" />
            <p className="user-comment">
              TRX-LABORATORYv supplements completely transformed my energy levels! Incredible taste and noticeable results.”
                            <br />
                            <div className="starts">
                 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                
                </div>
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="comment-card">
            <img src="https://i.pravatar.cc/100?img=7" alt="User" className="user-img" />
            <p className="user-comment">
              “I’ve tried many brands, but TRX-LABORATORYv stands out in quality and performance. Highly recommend!”
                            <br />
                            <div className="starts">
                 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                
                </div>
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="comment-card">
            <img src="https://i.pravatar.cc/100?img=3" alt="User" className="user-img" />
            <p className="user-comment">
              “From packaging to performance, TRX-LABORATORYv delivers excellence. My new go-to supplement brand!”
              <br />
              <div className="starts">
                 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                
                </div>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
