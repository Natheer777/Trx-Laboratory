import './Catego.css'
import { Link } from 'react-router-dom'
import categoImage1 from '../../assets/catego/Asset 1@8x.png'
import categoImage2 from '../../assets/catego/Asset 2@8x.png'
import categoImage3 from '../../assets/catego/Asset 3@8x.png'
import ShinyText from '../../components/ShinyText/ShinyText'
export default function Catego() {
    return (
        <div className="catego mb-5">
            <h1>
            <ShinyText 
            text="CATEGORIES"
            speed={3}
            className='shiny-heading'
            />

            </h1>
            <div className="categoImage">
                <ul>
                    <Link to="/injectables">
                    <li className='mt-4 hidden'><img src={categoImage1} alt="" />
                    </li>
                    </Link>
                    <Link to="/tablets">
                    <li className='mt-4 hidden'><img src={categoImage2} alt="" />
                        </li>
                    </Link>
                        <Link to="/Article">
                    <li className='mt-4 hidden'><img src={categoImage3} alt="" />
                        </li>
                        </Link>
                </ul>
            </div>
        </div>
    )
}
