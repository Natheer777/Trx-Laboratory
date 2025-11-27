import "./OUR_VIAL.css";
import ShinyText from "../../components/ShinyText/ShinyText";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function OurInjectables() {
  const [vialData, setVialData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Vials
  useEffect(() => {
    axios
      .get("https://trx-laboratory.com/get_vials_products.php")
      .then((res) => {
        setVialData(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching vials:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="OUR_INJECTABLES">
        {/* Header with Tabs */}
        <div className="borderOur mb-5">
          <h5>peptids</h5>
          <ul className="injectables-tabs">
            <li>
              <ShinyText
                text="OUR VIALS"
                speed={3}
                className="shiny-heading"
              />
            </li>
          </ul>
        </div>

        {/* Products Grid */}
        <div className="ProductsInjec container">
          <div className="All_Product">
            {loading ? (
              <div className="loading-state">Loading products...</div>
            ) : vialData.length === 0 ? (
              <div className="no-products">No products available</div>
            ) : (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={false}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  480: { slidesPerView: 1, spaceBetween: 15 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 25 },
                  1200: { slidesPerView: 3, spaceBetween: 30 },
                }}
                className="products-swiper"
                watchSlidesProgress={true}
                watchOverflow={true}
              >
                {vialData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="All_Product_items">
                      <div className="product-card p-4 shadow-sm">
                        <Swiper
                          spaceBetween={10}
                          slidesPerView={1}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          modules={[Autoplay]}
                          className="product-images-swiper"
                        >
                          {[item.img_url, item.img_url2, item.img_url3]
                            .filter(Boolean)
                            .map((img, idx) => (
                              <SwiperSlide key={`${item.id}-img-${idx}`}>
                                <div className="product-image-container">
                                  <img
                                    loading="lazy"
                                    src={img}
                                    alt={`${item.pname} ${idx + 1}`}
                                    className="product-image"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>

                        <h2 className="mt-3">{item.pname}</h2>
                        <p className="mb-4">
                          <strong>Price:</strong> {item.price}$
                        </p>
                        <a
                          className="Link_Product"
                          href={`${item.qr_code}?from=internal`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          read more
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </>
  );
}