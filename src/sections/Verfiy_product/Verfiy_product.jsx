import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInstagram, FiFacebook, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import scan from '../../assets/istockphoto-2183004296-612x612-removebg-preview.png';
import "./Verfiy_product.css";
import logo from '../../assets/logo/Asset 1@8x.png'

export default function VerifyProduct() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991.98);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const steps = [
    "Scratch the QR code on the back of the package.",
    "Use your smartphone camera to scan the QR code.",
    "Follow the link that the QR code refers to.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.section 
      className="verify-product-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="verification-card">
          <div className="verification-grid">
            {/* QR Code Section */}
            <motion.div 
              className="qr-code-section"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="qr-container" 
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
              >
                <div className="qr-overlay">
                  <FiCheck className="qr-icon" />
                  <span>Scan to Verify</span>
                </div>
                <img 
                  src={scan} 
                  alt="QR Code for Verification" 
                  className={`qr-image ${isHovered ? 'hovered' : ''}`}
                />
              </div>
            </motion.div>

            {/* Instructions Section */}
            <div className="instructions-section">
              <motion.h2 
                className="section-title"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Verify Your Product
              </motion.h2>
              
              <motion.ul 
                className="steps-list"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {steps.map((step, index) => (
                  <motion.li 
                    key={index}
                    className="step-item"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <span className="step-number">{index + 1}.</span>
                    <span className="step-text">{step}</span>
                  </motion.li>
                ))}
              </motion.ul>

             
               
            </div>

            {/* Brand Section */}
            <motion.div 
              className="brand-section"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="brand-logo-container">
                <img 
                  src={logo}
                  alt="HormoGenius Logo" 
                  className="brand-logo"
                />
                <div className="social-links">
                  <a 
                    href="https://www.instagram.com/hormogenius" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Instagram"
                  >
                    <FiInstagram />
                  </a>
                  <a 
                    href="#" 
                    className="social-link"
                    aria-label="Facebook"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Facebook link coming soon!');
                    }}
                  >
                    <FiFacebook />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
