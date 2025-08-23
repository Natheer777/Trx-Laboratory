import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInstagram, FiFacebook, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import scan from '../../assets/verify/a-realistic-close-up-of-a-hand-holding-a-modern-smartphone-the-phone-screen-showing-a-qr-code-being1.jpg';
import "./Verfiy_product.css";
import logo from '../../assets/logo/Asset 1@8x.png'
import { Link } from 'react-router-dom';

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
    "Scratch the designated area to reveal your unique code",
    "use your smartphone camera to scan the QR code",
    "Follow the link provided by the QR code",
    "Finally, enter the code you revealed into the verification field to confirm that your product is genuine",
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
              <motion.h2 
                className="section-title"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Verify Your Product
              </motion.h2>
          <div className="verification-grid">
            {/* QR Code Section with Button */}
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
         
                <img 
                  src={scan} 
                  alt="QR Code for Verification" 
                  className={`qr-image ${isHovered ? 'hovered' : ''}`}
                />
              </div>
              
              {/* Button moved here - below the image */}
              <motion.div 
                className="button-container"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
               <div className="brand-logo-container">
                <Link to="/authenticity">
               <button className='submit-btn btn btn-primary'>Go To Authenticity</button>
                </Link>
              </div>
              </motion.div>
            </motion.div>

            {/* Instructions Section */}
            <div className="instructions-section">
              
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
          </div>
        </div>
      </div>
    </motion.section>
  );
}