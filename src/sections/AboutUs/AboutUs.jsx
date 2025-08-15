import './AboutUs.css'
import conseptAbout from '../../assets/about/logo@8x.png'

export default function AboutUs() {
    return (
        <div className='about container mb-5'>
            <div className="contentAbout">

            <img src={conseptAbout} alt="" />
            <h3>about us</h3>
            <h1>Leading Scientific Facility
                For Testing And Research.</h1>
            <p>Welcome to TRX Laboratory, a leading innovator in pharmaceutical
                solutions. We are dedicated to the research, development, and
                production of a diverse portfolio of cutting-edge oral, injectable,
                and specialized dosage forms, committed to advancing health and
                performance worldwide</p>
            <button className='explore-button'>EXPLORE</button>
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
