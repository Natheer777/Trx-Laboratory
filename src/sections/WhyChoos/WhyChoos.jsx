import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './WhyChoos.css';

// Import images
import icon1 from '../../assets/Why_Choos/24-hours (1).png';
import icon2 from '../../assets/Why_Choos/rapid.png';
import icon3 from '../../assets/Why_Choos/microscope.png';
import icon4 from '../../assets/Why_Choos/teamwork.png';

const features = [
  {
    icon: icon1,
    title: '24/7 Support',
    description: 'Our dedicated team is available around the clock to assist you with any inquiries or issues.'
  },
  {
    icon: icon2,
    title: 'Fast Service',
    description: 'We pride ourselves on delivering quick and efficient service without compromising on quality.'
  },
  {
    icon: icon3,
    title: 'Advanced Technology',
    description: 'Using cutting-edge technology and equipment to provide you with the best possible results.'
  },
  {
    icon: icon4,
    title: 'Expert Team',
    description: 'Our team of experienced professionals is committed to delivering excellence in every project.'
  }
];

export default function WhyChoos() {
  return (
    <section className="why-choose-us py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title top">Why Choose Us</h2>
          <p className="section-subtitle hidden">We provide the best service with our professional team</p>
        </div>
        
        <Row className="g-4 hidden">
          {features.map((feature, index) => (
            <Col key={index} xs={12} sm={6} md={3} className="feature-col">
              <div className="feature-card text-center p-4 h-100">
                <div className="feature-icon mb-3">
                  <img src={feature.icon} alt={feature.title} className="img-fluid" />
                </div>
                <h3 className="feature-title h5 mb-3">{feature.title}</h3>
                <p className="feature-description mb-0">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
