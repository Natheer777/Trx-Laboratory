import './OUR_INJECTABLES.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ShinyText from '../../components/ShinyText/ShinyText';
export default function OUR_INJECTABLES() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://trx-laboratory.com/get_injection_products.php")
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    <div className="OUR_INJECTABLES">
        <div className="borderOur">
        <h5>CHECK OUT!</h5>
        <ul>
          <li>
          <ShinyText 
          text="OUR INJECTABLES"
          speed={3}
          className='shiny-heading'
          />

            </li>
            <li>VIAL 10 ML</li>
        </ul>
        </div>
        <div className="ProductsInjec container">
        <div className="All_Product">
        {data.map((item) => (
          <div key={item.id} className="All_Product_items hidden">
            <div className="product-card p-4 shadow-sm">
              <div className="product-image-container">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="product-swiper"
                >
                  {[item.img_url, item.img_url2, item.img_url3].map((img, index) => (
                    img && (
                      <SwiperSlide key={index}>
                        <img 
                          loading="lazy" 
                          src={img} 
                          alt={`${item.pname} ${index + 1}`} 
                          className="product-image"
                        />
                      </SwiperSlide>
                    )
                  ))}
                </Swiper>
              </div>
              <h2 className="mt-3">{item.pname}</h2>
              <p className="mb-4">
                <strong>Price:</strong> {item.price}$
              </p>
              <a
                className="Link_Product"
                href={`${item.qr_code}?from=internal`}
                target="_blank"
              >
                read more
              </a>

            </div>
          </div>
        ))}
      </div>
        </div>
    </div>
    </>
  )
}
