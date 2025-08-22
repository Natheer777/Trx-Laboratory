import React, { useState } from 'react';
import './Articel.css';
import Blogs from '../Blog/Blog';
import TextType from '../../components/TextType/TextType';

export default function Article() {
  const [showFullContent, setShowFullContent] = useState(false);
  
  return (
    <section className="article-section">
      <div className="article-container">
        <h1 className="article-title">
          <TextType
            text="Understanding Steroids: A Comprehensive Overview"
            typingSpeed={100}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />


        </h1>

        <div className="article-image">
          <Blogs />
          {/* <img src={articleImage} alt="Steroids medical illustration" /> */}
        </div>

        <div className="article-content">
          <div className={`article-intro ${!showFullContent ? 'article-intro--collapsed' : ''}`}>
            <p>
            
            
            </p>
          </div>
          <button 
            className="show-more-btn" 
            onClick={() => setShowFullContent(!showFullContent)}
          >
            {showFullContent ? 'Show Less' : 'Show More'}
          </button>

          {/* <div className="article-section">
            <h2>Anabolic Steroids: Muscle, Performance, and Risks</h2>
            <p>Anabolic steroids are synthetic derivatives of testosterone, the primary male sex hormone. These steroids possess both anabolic (muscle-building) and androgenic (masculinizing) properties. Despite their notoriety due to misuse, anabolic steroids have legitimate and crucial medical applications.</p>
            
            <h3>Medical Applications</h3>
            <p>Anabolic steroids are utilized in the management of various medical conditions including:</p>
            <ul>
              <li>Primary hypogonadism</li>
              <li>Delayed puberty in boys</li>
              <li>Hypogonadotropic hypogonadism</li>
              <li>Luteinizing hormone-releasing hormone deficiency</li>
              <li>Pituitary-hypothalamic axis dysfunction</li>
            </ul>

            <h3>Health Risks and Side Effects</h3>
            <p>Misuse of anabolic steroids can lead to severe health consequences:</p>
            <ul>
              <li>Cardiovascular issues (hypertension, heart disease)</li>
              <li>Liver damage and tumors</li>
              <li>Reproductive system disorders</li>
              <li>Psychiatric effects (mood swings, aggression, depression)</li>
              <li>Physical changes (acne, hair loss, gynecomastia)</li>
            </ul>
          </div>

          <div className="article-section">
            <h2>Corticosteroids: Potent Anti-Inflammatories</h2>
            <p>Corticosteroids are a class of steroid hormones that closely mimic cortisol, a natural anti-inflammatory hormone produced by the adrenal glands. They are vital regulators of whole-body homeostasis.</p>
            
            <h3>Medical Uses</h3>
            <p>Corticosteroids are primarily used for their powerful anti-inflammatory and immunosuppressive properties in conditions such as:</p>
            <ul>
              <li>Asthma and allergies</li>
              <li>Rheumatoid arthritis</li>
              <li>Lupus</li>
              <li>Inflammatory bowel disease</li>
              <li>Skin conditions (eczema, psoriasis)</li>
            </ul>

            <h3>Potential Side Effects</h3>
            <p>With prolonged use, corticosteroids can cause:</p>
            <ul>
              <li>Osteoporosis</li>
              <li>Weight gain</li>
              <li>Increased blood sugar levels</li>
              <li>Higher infection risk</li>
              <li>Adrenal suppression</li>
            </ul>
          </div>

          <div className="article-section">
            <h2>Key Differences</h2>
            <div className="comparison-table">
              <div className="comparison-row header">
                <div className="comparison-cell">Aspect</div>
                <div className="comparison-cell">Anabolic Steroids</div>
                <div className="comparison-cell">Corticosteroids</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Primary Use</div>
                <div className="comparison-cell">Muscle building, testosterone replacement</div>
                <div className="comparison-cell">Anti-inflammatory, immunosuppression</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Medical Conditions Treated</div>
                <div className="comparison-cell">Hypogonadism, muscle wasting</div>
                <div className="comparison-cell">Arthritis, asthma, allergies, autoimmune diseases</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Common Side Effects</div>
                <div className="comparison-cell">Liver damage, cardiovascular issues, hormonal imbalances</div>
                <div className="comparison-cell">Weight gain, osteoporosis, increased infection risk</div>
              </div>
            </div>
          </div> */}

          {/* <div className="conclusion">
            <h3>Conclusion</h3>
            <p>While both anabolic steroids and corticosteroids are medically valuable when used appropriately under professional supervision, they serve very different purposes and carry distinct risks. It's crucial to understand these differences and always consult healthcare professionals before starting or stopping any steroid medication.</p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
