import React from 'react';
import './Authenticity.css';
import image from '../../assets/Authenticity/14.jpg';

export default function Authenticity() {
  return (
    <div className="authenticity-container">
      <img 
        src={image} 
        alt="Authenticity" 
        className="authenticity-image"
      />
      <div className="axxio-laboratory">
        <div className="container">
          <h1 className="section-title d-grid">Axxio Laboratory</h1>
          <p className="section-description">
          Axxio Laboratory is deeply committed to upholding the authenticity and integrity of its products through a comprehensive and robust multi-layered authentication system. Within the realm of injections, every Axxio product is furnished with a series of distinctive and secure identifiers that empower customers to confidently verify the legitimacy of their purchase. These unique identifiers serve as tangible assurances of quality and authenticity, underscoring Axxio's unwavering dedication to delivering genuine and reliable products to consumers.
          </p>
          <div className="features-grid m-1">
            <div className="feature-item">
              <h3>Scratch Code
              </h3>
              <p>Scratch off the designated area to reveal a unique code. Enter this code on the authentication website to verify your product's legitimacy.</p>
            </div>
            <div className="feature-item">
              <h3>Flip Effect
              </h3>
              <p>Axxio's name and the specific product name will be displayed in a holographic image on genuine injection products.</p>
            </div>
            <div className="feature-item">
              <h3>Axxio Logo</h3>
              <p>Look for the Axxio logo clearly debossed on the plastic cartridge tray. This is another indicator of a genuine Axxio product.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
