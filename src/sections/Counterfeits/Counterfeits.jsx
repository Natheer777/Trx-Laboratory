import image from '../../assets/Authenticity/14.jpg';
import './Counterfeits.css';

export default function Counterfeits() {
    return (
        <div className="counterfeits-container">
            <img
                src={image}
                alt="Authenticity"
                className="authenticity-image"
            />
            <section className="counterfeits-section">
                <div className="container mt-4">
                    <h1 className="section-title d-grid">Beware Of Counterfeits!</h1>
                    <p className="section-description">
                        Beware of counterfeit products trading off the valuable goodwill of the Axxio Laboratory® brand. Like many companies that have expended years and enormous resources in carefully developing brand recognition, Axxio Laboratory products are being unlawfully imitated and sold at inferior quality through unauthorized channels, and usually at drastically reduced prices. These inferior Knockoffs are not easy to detect. Accordingly, these products do not meet Axxio Laboratory Group’s quality standards.
                    </p>
                    <p className="section-description">
                        The only way to ensure that you are purchasing genuine Axxio products with assurance by Axxio Group, is to purchase through an authorized retailer. Please report any suspect products to <a href="mailto:info@axxio-laboratory.com" className="counterfeits-link">info@axxio-laboratory.com</a> or visit <a href="https://www.my-axxio.com/" className="counterfeits-link" target="_blank" rel="noopener noreferrer">https://www.my-axxio.com/</a>.
                    </p>
                    <p className="section-description">
                        We intend to vigorously investigate those who manufacture or sell counterfeit Axxio® products and take action against counterfeiters as appropriate to protect the value that the Axxio Laboratory brand has come to represent. If you have any questions concerning this issue, please contact Customer Service. We appreciate your help in maintaining the integrity of the Axxio brand. Beware of Bulk Packaged Products Sold as New
                    </p>
                    <p className="section-description">
                        Axxio Laboratory never sells old line-packaged products. All new Axxio brand products are sold in individual, factory-sealed packages. Any product advertised as “genuine” but in “OLD” packaging is either used or counterfeit and should be treated as suspect.
                    </p>
                </div>
            </section>
        </div>
    );
}