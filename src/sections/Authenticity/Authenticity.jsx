import React, { useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Authenticity.css';
import imagePc1 from '../../assets/auth/المستخدم/عرض كمبيوتر/1.png';
import imagePc2 from '../../assets/auth/المستخدم/عرض كمبيوتر/2.png';
import imageMobile1 from '../../assets/auth/المستخدم/عرض موبايل/Asset 6@8x.png';
import imageMobile2 from '../../assets/auth/المستخدم/عرض موبايل/Asset 7@8x.png';
import Details_product from '../Details_product/Details_product';

export default function Authenticity() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  // بيانات الصور للـ Swiper
  const slidesData = [
    {
      pcImage: imagePc1,
      mobileImage: imageMobile1,
    },
    {
      pcImage: imagePc2,
      mobileImage: imageMobile2,
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 5) {
      setError('Please enter a 5-character code');
      return;
    }

    setIsLoading(true);
    setError('');
    setVerificationStatus(null);
    setResponse(null);
    setProductDetails(null);
    
    try {
      const result = await axios.post('https://trx-laboratory.com/get_product_by_code.php', {
        code: code
      });
      
      setResponse(result.data);
      
      if (result.data.status === 'success' && result.data.data && result.data.data.length > 0) {
        setVerificationStatus('valid');
        setProductDetails(result.data.data[0]);
      } else {
        setVerificationStatus('invalid');
      }
    } catch (err) {
      setVerificationStatus('error');
      setError('An error occurred while verifying the code. Please try again.');
      console.error('Error verifying code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 5) {
      setCode(value);
      setError('');
    }
  };

  return (
    <div className="authenticity-container">
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
                    alt={`Authenticity slide ${index + 1}`}
                    className="authenticity-image"
                  />
                </picture>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="axxio-laboratory">
        <div className="container mt-4">
          <h1 className="section-title d-grid">Trx-Laboratory Laboratory</h1>
          <p className="section-description">
            Trx-Laboratory Laboratory is deeply committed to upholding the authenticity and integrity of its products through a comprehensive and robust multi-layered authentication system. Within the realm of injections, every Trx-Laboratory product is furnished with a series of distinctive and secure identifiers that empower customers to confidently verify the legitimacy of their purchase. These unique identifiers serve as tangible assurances of quality and authenticity, underscoring Axxio's unwavering dedication to delivering genuine and reliable products to consumers.
          </p>

          <div className="features-grid m-1">
            <div className="feature-item">
              <h3>Scratch Code</h3>
              <p>Scratch off the designated area to reveal a unique code. Enter this code on the authentication website to verify your product's legitimacy.</p>
            </div>
            <div className="feature-item">
              <h3>Flip Effect</h3>
              <p>Trx-Laboratory's name and the specific product name will be displayed in a holographic image on genuine injection products.</p>
            </div>
            <div className="feature-item">
              <h3>Trx-Laboratory Logo</h3>
              <p>Look for the Trx-Laboratory logo clearly debossed on the plastic cartridge tray. This is another indicator of a genuine Trx-Laboratory product.</p>
            </div>
          </div>

          <div className="verification-section pt-4 pb-4">
            <h2>Product Verification</h2>
            <form onSubmit={handleSubmit} className="verification-form">
              <div className="form-group">
                <input
                  type="text"
                  value={code}
                  onChange={handleInputChange}
                  maxLength={5}
                  placeholder="Enter 5-character code"
                  className="code-input"
                  dir="ltr"
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              <button 
                type="submit" 
                className="verify-button"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </form>

            {verificationStatus === 'valid' && productDetails ? (
              <div className="product-details-container">
                <div className="verification-success">
                  <div className="status-icon valid">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                  <h3>Verification Successful!</h3>
                  <p>This product is genuine and verified by Trx-Laboratory Laboratory.</p>
                </div>
                <div className="verified-product-details">
                  <Details_product productData={productDetails} suppressErrors={true} />
                </div>
              </div>
            ) : verificationStatus === 'invalid' ? (
              <div className="response-container">
                <div className="verification-status invalid">
                  <div className="status-icon invalid">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                  </div>
                  <h3>Verification Failed</h3>
                  <p>This product could not be verified. Please check the code and try again.</p>
                  {response?.message && <p className="error-message">{response.message}</p>}
                </div>
              </div>
            ) : verificationStatus === 'error' ? (
              <div className="response-container">
                <div className="verification-status unknown">
                  <div className="status-icon unknown">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                  </div>
                  <h3>Verification Error</h3>
                  <p>An error occurred during verification. Please try again later.</p>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}