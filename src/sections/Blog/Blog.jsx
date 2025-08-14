import './Blog.css'
import imgBlog from '../../assets/Blog/injectable.webp'
export default function Blog() {
  return (
    <div className='blog container'>
        <div className="blogImage">
            <img src={imgBlog} alt="" />
        </div>
        <div className='textBlog'>
        <h3>Exploring Speciality Chemicals vs...</h3>
        <p>Discover the differences between specialty and commodity chemicals, from tailored formulations to bulk production. Explore their unique roles today!</p>
        <p className='blogSpan'>Published By <span>TRX-LABORATORY</span> | on <span>5/2/2024</span></p>
        </div>
    </div>
  )
}
