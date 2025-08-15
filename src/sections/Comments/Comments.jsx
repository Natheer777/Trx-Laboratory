import './Comments.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Comments() {
  return (
    <div className="comment-section container">
      <div className="text-center">
        <h3 className="comment-title">What Our Customer Says</h3>
        <h1 className="section-heading">Our Testimonials</h1>
      </div>

      <div className="card-container">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            bulletActiveClass: 'custom-bullet-active'
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="testimonial-swiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {[
            {
              id: 1,
              img: "https://i.pravatar.cc/100?img=12",
              comment: "TRX-LABORATORYv supplements completely transformed my energy levels! Incredible taste and noticeable results.",
              name: "Alex Johnson",
              role: "Fitness Enthusiast"
            },
            {
              id: 2,
              img: "https://i.pravatar.cc/100?img=7",
              comment: "I've tried many brands, but TRX-LABORATORYv stands out in quality and performance. Highly recommend!",
              name: "Sarah Williams",
              role: "Professional Athlete"
            },
            {
              id: 3,
              img: "https://i.pravatar.cc/100?img=3",
              comment: "From packaging to performance, TRX-LABORATORYv delivers excellence. My new go-to supplement brand!",
              name: "Michael Chen",
              role: "Health Coach"
            }
          ].map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="comment-card">
                <div className="quote-icon">
                  <FaQuoteLeft />
                </div>
                <div className="comment-content">
                  <p className="user-comment">
                    {testimonial.comment}
                  </p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                  <div className="user-info">
                    <img 
                      src={testimonial.img} 
                      alt={testimonial.name} 
                      className="user-img" 
                    />
                    <div className="user-details">
                      <h4 className="user-name">{testimonial.name}</h4>
                      <p className="user-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
