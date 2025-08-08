import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './ContactUs.css';

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Show success message
    setIsSubmitted(true);
    // Reset form
    e.target.reset();
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="contact-section">
      <Container>
        <div className="section-title text-center mb-5 d-grid">
          <h2>Get In Touch</h2>
          <p>Have questions or need assistance? Send us a message and we'll get back to you as soon as possible.</p>
        </div>
        
        <Row className='justify-content-center'>

          <Col lg={7}>
            <div className="contact-form">
              {isSubmitted && (
                <div className="success-message">
                  <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                  <h4>Message Sent Successfully!</h4>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              )}
              
              <Form onSubmit={handleSubmit} className={isSubmitted ? 'd-none' : ''}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formName">
                      <Form.Label>Your Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your name"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formEmail">
                      <Form.Label>Your Email <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                
                <Form.Group className="mb-4" controlId="formMessage">
                  <Form.Label>Your Message <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    required
                    placeholder="Enter your message"
                  />
                </Form.Group>
                
                <div className="text-center">
                  <Button 
                    type="submit" 
                    className="submit-btn"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                    Send Message
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;