import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './AboutLong.css';

// Import images
import img1 from '../../assets/AboutLong/1.png';
import img2 from '../../assets/AboutLong/2.png';
import img3 from '../../assets/AboutLong/3.png';

const images = [img1, img2, img3];

export default function AboutLong() {
    return (
        <section className="aboutLong about-section py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h2 className="section-title text-4xl font-bold text-gray-800 mb-6">
                            Welcome to <span className="text-blue-600">TRX Laboratory</span>
                        </h2>
                           {/* Image Swiper */}
                    <div className="relative mb-4 mt-4">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="rounded-lg shadow-xl"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="h-96 w-full">
                                        <img 
                                            src={img} 
                                            alt={`TRX Laboratory ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to TRX Laboratory, a leading innovator in pharmaceutical solutions. We are dedicated to the research, development, and production of a diverse portfolio of cutting-edge oral, injectable, and specialized dosage forms, committed to advancing health and performance worldwide.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            At TRX Laboratory, we're committed to developing innovative new products and constantly improving our existing offerings. We use the latest, cutting-edge technology in our state-of-the-art facilities to ensure that everything we produce meets the highest standards of excellence, quality, and effectiveness.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We're proud to offer our products to customers globally and are always looking for new international business opportunities. We believe in building honest and transparent partnerships with our distributors and are dedicated to providing exceptional service to our clients.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            In addition to our focus on high-quality products and excellent customer service, we also prioritize modern packaging & design to ensure that everything we manufacture stands out on the shelf.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Thank you for considering TRX Laboratory for your pharmaceutical needs. We look forward to building a successful partnership with you.
                        </p>
                    </div>
                    
               
                </div>
            </div>
        </section>
    );
}
