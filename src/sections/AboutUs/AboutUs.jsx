import './AboutUs.css';
import conseptAbout from '../../assets/about/logo@8x.png';
import TextType from '../../components/TextType/TextType';

export default function AboutUs() {
    return (
        <div className='about container mb-5'>
            <div className="contentAbout">

            <img src={conseptAbout} alt="" />
            <h3 className='left'>about us</h3>
            <h1>
              <TextType 
                text={["Leading Scientific Facility For Testing And Research."]}
                typingSpeed={100}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </h1>
            <p className='top'>Welcome to TRX Laboratory, a leading innovator in pharmaceutical
                solutions. We are dedicated to the research, development, and
                production of a diverse portfolio of cutting-edge oral, injectable,
                and specialized dosage forms, committed to advancing health and
                performance worldwide</p>
            <button className='explore-button hidden'>EXPLORE</button>
            </div>
            <div className="marquee-container mt-5">
          <div className="marquee-text">
            <ul>
              <li>
                <span>
                </span>{" "}
                TRX-LABORATORY
              </li>
              <li>
                <span>
                </span>{" "}
                TRX-LABORATORY
              </li>
              <li>
                <span>
                </span>{" "}
                TRX-LABORATORY
              </li>
              <li>
                <span>
                </span>{" "}
                TRX-LABORATORY
              </li>
              <li>
                <span>
                </span>{" "}
                TRX-LABORATORY
              </li>
              <li>
                <span>
                </span>{" "}
                TRX-LABORATORY
              </li>
            </ul>
          </div>
        </div>
        </div>
    )
}
