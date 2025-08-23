import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Details_Product.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Enhanced CircularProgress component with amazing continuous effects
const CircularProgress = ({
  size = 80,
  color = "#007bff",
  value = 0,
  showValue = true,
  className = "",
  strokeWidth = 8,
  ...props
}) => {
  // Responsive size for mobile
  const isMobile = window.innerWidth <= 768;
  const responsiveSize = isMobile ? size * 0.6 : size;
  const responsiveStrokeWidth = isMobile ? strokeWidth * 0.7 : strokeWidth;
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (typeof value === "number") {
      // Initial animation to target value
      const initialTimer = setTimeout(() => {
        setAnimatedValue(value);
      }, 1000);

      // Continuous looping animation with proper value display
      const loopInterval = setInterval(() => {
        setAnimatedValue((prev) => {
          // Animate between 0 and target value continuously
          if (prev >= value) {
            return 0;
          } else {
            return prev + value / 15; // Smooth increment
          }
        });
      }, 100);

      return () => {
        clearTimeout(initialTimer);
        clearInterval(loopInterval);
      };
    }
  }, [value]);

  // Create continuous pulsing effect
  const pulseScale = 1 + 0.1 * Math.sin(Date.now() / 500); // Continuous pulse
  const glowIntensity = 0.5 + 0.3 * Math.sin(Date.now() / 300); // Continuous glow

  return (
    <div
      className={`circular-progress-wrapper ${className}`}
      style={{
        position: "relative",
        display: "inline-block",
        width: responsiveSize,
        height: responsiveSize,
        transform: `scale(${pulseScale})`,
        transition: "transform 0.3s ease-in-out",
        filter: `drop-shadow(0 0 ${glowIntensity * 10}px ${color})`,
      }}
      {...props}
    >
      <CircularProgressbar
        value={animatedValue}
        text={showValue ? `${Math.round(animatedValue)}%` : ""}
        styles={buildStyles({
          pathColor: color,
          textColor: color,
          trailColor: "rgba(255, 255, 255, 0.1)",
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
          pathTransition: "ease-in-out",
        })}
        strokeWidth={responsiveStrokeWidth}
      />

      {/* Animated background ring */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: `2px solid ${color}`,
          opacity: 0.3,
          animation: "pulse-ring 2s infinite",
        }}
      />

      {/* Rotating dots effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          animation: "rotate-dots 3s linear infinite",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: isMobile ? "3px" : "4px",
              height: isMobile ? "3px" : "4px",
              borderRadius: "50%",
              backgroundColor: color,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${
                i * 45
              }deg) translateY(-${responsiveSize * 0.4}px)`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes pulse-ring {
            0% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.1;
            }
            100% {
              transform: scale(1);
              opacity: 0.3;
            }
          }
          
          @keyframes rotate-dots {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          .circular-progress-wrapper:hover {
            transform: scale(1.05) !important;
            filter: drop-shadow(0 0 15px ${color}) !important;
          }
        `}
      </style>
    </div>
  );
};
// const productColors = {
//   DECA250mg: "#3bb9eb",
//   NPP100mg: "#3bb9eb",
//   primo100mg: "#3bb9eb",
//   Sustalon250mg: "#3bb9eb",

//   "L-carnitine+Yohimbine+Clen200mg": "#008081",
//   MASTE100mg: "#008081",
//   MASTERON200mg: "#008081",

//   "TEST-C200": "#25356e",
//   "TEST-E250": "#25356e",
//   "TEST-P100": "#25356e",

//   "TREN-A100mg": "#6564aa",
//   "TREN-E200mg": "#6564aa",

//   Bolde250mg: "#6564aa",

//   // "Carntin+Yohimbine": "#008081",
//   "ANAVAR-10mg": "#6564aa",
//   "CLENBUT-40mg": "#008081",
//   "DIANABOL-10mg": "#3bb9eb",
//   "OXYTHOL-50mg": "#25356e",
//   "WINSTROL-10mg": "#6564aa",
// };
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// دالة JSX مخصصة لعرض اسم المنتج بشكل مقسم وملون (نفس منطق Products_home)
const renderSpecialLCarnitineName = () => (
  <div style={{ lineHeight: 1.1 }}>
    <div style={{ letterSpacing: "1px" }}>L-Carnitine</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{}}>+ Yohimbine</span>
    </div>
    <div style={{ marginTop: 2 }}>+ CLEN</div>
  </div>
);

export default function Details_product({
  productData: productDataProp,
  overrideLoading,
  productId,
  productName,
  suppressErrors = false,
}) {
  const params = useParams();
  // تتبع القيم المستلمة
  console.log(
    "Details_Product.jsx - productName prop:",
    productName,
    "useParams:",
    params
  );
  const [productData, setProductData] = useState(productDataProp || null);
  const [loading, setLoading] = useState(productDataProp ? false : true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (productDataProp) return;
    const fetchProduct = async () => {
      try {
        let res;
        if (productId) {
          res = await axios.post(
            "https://trx-laboratory.com/get_product_by_id.php",
            {
              id: productId,
            }
          );
        } else {
          res = await axios.post(
            "https://trx-laboratory.com/get_product_by_name.php",
            {
              name: productName,
            }
          );
        }
        if (res.data.status === "success") {
          setProductData(res.data.data[0]);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productName, productId, productDataProp]);

  // تتبع بيانات المنتج بعد الجلب
  useEffect(() => {
    console.log("Details_Product.jsx - productData:", productData);
  }, [productData]);

  if (overrideLoading === false ? false : loading) return <p></p>;
  if (error && !suppressErrors)
    return (
      <div className="details-error-container">
        <p className="details-error-message">{error}</p>
        {/* <p className="details-error-subtitle">
          This product has been previously verified. <br />
          (This QR code has been scanned before.)
        </p> */}
      </div>
    );
  if (!productData) return <p></p>;

  // إخفاء منتج Carntin+Yohimbine
  if (productData.pname === "Carntin+Yohimbine") {
    return (
      <div className="details-error-container">
        <p className="details-error-message">This product not found</p>
      </div>
    );
  }

  const {
    pname,
    name,
    product_overview,
    uses,
    potential_harms,
    method_of_use,
    price,
    qr_code,
    warnings,
    vial,
    caliber,
    sec_name,
    vid_url,
    img_url,
    img_url2,
    img_url3,
    science_name
  } = productData;

  // const productColor = productColors[pname] || "#ffffff";
  // Clean up the science_name display
  const displayScienceName = science_name
    ? science_name.replace(/[()]/g, '').trim()
    : '';

  const formatTextWithNumbers = (text, useProductColor = false) => {
    if (!text) return "";

    const parts = text.split(/(\d+)/);
    return parts.map((part, index) => {
      if (/^\d+$/.test(part)) {
        return (
          <span
            key={index}
            className="number-value"
            // style={useProductColor ? { color: productColor } : {}}
          >
            {part}
          </span>
        );
      } else {
        return (
          <span key={index} className="text-content">
            {part}
          </span>
        );
      }
    });
  };

  return (
    <>
      {/* <div
        className="BackgroundImage"
        style={{
          backgroundImage: `url(${img_url})`,
        }}
      ></div> */}

      <div className="swiper_product mb-5 container">
        <div className="Swiper_Conent">
          <div className="container">
            <div className="row">
              <div className="Swiper left col-xl-6 col-lg-6 ">
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
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {[img_url, img_url2, img_url3].map((img, index) => (
                    img && (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt={`product ${index + 1}`}
                          className="img-fluid mt-4"
                          style={{ borderRadius: "20px", maxWidth: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    )
                  ))}
                </Swiper>
              </div>

              <div className="col-xl-6 col-lg-6 ">
                <div className="detailsMainProduct pb-4">
                  <div>
                    <h1
                      className="product_name text-xl font-bold  left"
                      // style={{ color: productColor }}
                    >
                      {/* تخصيص عرض اسم المنتج إذا كان هو المطلوب */}
                      {pname &&
                      pname
                        .replace(/-/g, "")
                        .replace(/\s+/g, "")
                        .toLowerCase() === "lcarnitine+yohimbine+clen200mg"
                        ? renderSpecialLCarnitineName()
                        : (() => {
                            let name = pname || "";
                            // Only remove '-' for tablets products
                            if (
                              productData.sec_name &&
                              productData.sec_name.toLowerCase() === "tablets"
                            ) {
                              name = name.replace(/-/g, " ");
                            }
                            const match = name.match(/^[^\d]*/);
                            return match
                              ? match[0].trim().toUpperCase()
                              : name.toUpperCase();
                          })()}
                    </h1>
                    {sec_name && (
                      <p className="sec_name">
                        {capitalizeFirstLetter(sec_name.replace(/[()]/g, ""))}
                      </p>
                    )}
                    {/* {science_name && (
                      <p className="sec_name">
                        {capitalizeFirstLetter(science_name.replace(/[()]/g, ""))}
                      </p>
                    )} */}
                  </div>
                  <div>
                    <span className="vial right">
                      <span>
                        {sec_name === "injections"
                          ? "Vial: "
                          : sec_name === "tablets"
                          ? "Tablets: "
                          : "Vial: "}
                      </span>
                      {vial}
                    </span>{" "}
                    <p className="caliber right">
                      {caliber}
                    </p>  
                    <span className="price  left">
                      <span>Price: </span>
                      {price}$
                    </span>
                  </div>
                </div>
                <div className="details_product pb-5">
                  {product_overview && (
                    <div className="product-section">
                      <h3 className="section-title">Product Overview</h3>
                      <p className="section-content">{product_overview}</p>
                    </div>
                  )}

                  {uses && (
                    <div className="product-section mt-4">
                      <h3 className="section-title">Uses</h3>
                      <p className="section-content">{uses}</p>
                    </div>
                  )}

                  {potential_harms && (
                    <div className="product-section mt-4">
                      <h3 className="section-title">Potential Harms</h3>
                      <div className="section-content" style={{ whiteSpace: 'pre-line' }}>
                        {potential_harms}
                      </div>
                    </div>
                  )}

                  {method_of_use && (
                    <div className="product-section mt-4">
                      <h3 className="section-title">Method of Use</h3>
                      <p className="section-content">{method_of_use}</p>
                    </div>
                  )}

                  {warnings && (
                    <div className="product-section mt-4">
                      <h3 className="section-title warning">Warnings</h3>
                      <div className="section-content" style={{ whiteSpace: 'pre-line' }}>
                        {warnings}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-video mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              {vid_url ? (
                <video
                  src={vid_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    maxWidth: "22rem",
                    maxHeight: "380px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                ></video>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
