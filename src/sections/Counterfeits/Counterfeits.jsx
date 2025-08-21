import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import imagePc1 from '../../assets/auth/المستخدم/عرض كمبيوتر/1.png';
import imagePc2 from '../../assets/auth/المستخدم/عرض كمبيوتر/2.png';
import imageMobile1 from '../../assets/auth/المستخدم/عرض موبايل/Asset 6@8x.png';
import imageMobile2 from '../../assets/auth/المستخدم/عرض موبايل/Asset 7@8x.png';
import './Counterfeits.css';

export default function Counterfeits() {
    const slidesData = [
        // {
        //     pcImage: imagePc1,
        //     mobileImage: imageMobile1,
        // },
        {
            pcImage: imagePc2,
            mobileImage: imageMobile2,
        }
    ];

    return (
        <div className="counterfeits-container">
            {/* Swiper للصور مع responsive images */}
            <div className="authenticity-image-slider">
                <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="authenticity-swiper"
                >
                    {slidesData.map((slide, index) => (
                        <SwiperSlide key={index} className="authenticity-slide">
                            <div className="slide-background">
                                <picture>
                                    <source 
                                        media="(max-width: 768px)" 
                                        srcSet={slide.mobileImage} 
                                    />
                                    <source 
                                        media="(min-width: 769px)" 
                                        srcSet={slide.pcImage} 
                                    />
                                    <img
                                        src={slide.pcImage}
                                        alt={`Counterfeits awareness slide ${index + 1}`}
                                        className="authenticity-image"
                                    />
                                </picture>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <section className="counterfeits-section">
                <div className="container mt-4">
                    <h1 className="section-title d-grid">Beware Of Counterfeits!</h1>
                    <p className="section-description">
                        Beware of counterfeit products trading off the valuable goodwill of the Trx-Laboratory Laboratory® brand. Like many companies that have expended years and enormous resources in carefully developing brand recognition, Trx-Laboratory Laboratory products are being unlawfully imitated and sold at inferior quality through unauthorized channels, and usually at drastically reduced prices. These inferior Knockoffs are not easy to detect. Accordingly, these products do not meet Trx-Laboratory Laboratory Group's quality standards.
                    </p>
                    <p className="section-description">
                        The only way to ensure that you are purchasing genuine Trx-Laboratory products with assurance by Trx-Laboratory Group, is to purchase through an authorized retailer. Please report any suspect products to .
                    </p>
                    <p className="section-description">
                        We intend to vigorously investigate those who manufacture or sell counterfeit Trx-Laboratory products and take action against counterfeiters as appropriate to protect the value that the Trx-Laboratory brand has come to represent. If you have any questions concerning this issue, please contact Customer Service. We appreciate your help in maintaining the integrity of the Trx-Laboratory brand. Beware of Bulk Packaged Products Sold as New
                    </p>
                    <p className="section-description">
                        Trx-Laboratory Laboratory never sells old line-packaged products. All new Trx-Laboratory brand products are sold in individual, factory-sealed packages. Any product advertised as "genuine" but in "OLD" packaging is either used or counterfeit and should be treated as suspect.
                    </p>
                </div>
            </section>
        </div>
    );
}