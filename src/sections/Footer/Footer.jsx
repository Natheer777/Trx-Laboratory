import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Container>
          <Row className='justify-content-evenly'>
            <Col lg={4} md={6} className="footer-about">
              <div className="footer-logo">
                <img src="/logo.png" alt="Logo" />
              </div>
              <p>
                We are a leading laboratory equipment provider, offering high-quality products and solutions for scientific research and healthcare institutions.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
             
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
              </div>
            </Col>

            <Col lg={2} md={6} className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Authenticity">Authenticity</Link></li>
                <li><Link >Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </Col>

           

        
          </Row>
        </Container>
      </div>

      <div className="footer-bottom">
        <Container>
          <Row>
            <Col md={12}>
              <div className="copyright">
                &copy; {new Date().getFullYear()} Trx-Laboratory. All Rights Reserved.
             
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;