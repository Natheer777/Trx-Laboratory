import './Catego.css'
import categoImage1 from '../../assets/catego/Asset 1@8x.png'
import categoImage2 from '../../assets/catego/Asset 2@8x.png'
import categoImage3 from '../../assets/catego/Asset 3@8x.png'
export default function Catego() {
    return (
        <div className="catego mb-5">
            <h1>CATEGORIES</h1>
            <div className="categoImage">
                <ul>
                    <li className='mt-4'><img src={categoImage1} alt="" />
                    </li>
                    <li className='mt-4'><img src={categoImage2} alt="" />
                        </li>
                    <li className='mt-4'><img src={categoImage3} alt="" />
                        </li>
                </ul>
            </div>
        </div>
    )
}
