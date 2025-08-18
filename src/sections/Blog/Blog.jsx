import './Blog.css'
import imgBlog from '../../assets/catego/Asset 3@8x.png'
export default function Blog() {
  return (
    <div className='blog container'>
        <div className="blogImage">
            <img src={imgBlog} alt="" />
        </div>
        <div className='textBlog'>
        <h3>Understanding Steroids: A Comprehensive Overview</h3>
        <p>Steroids represent a broad class of organic compounds characterized by their distinctive molecular structure. In the medical field the term "steroids"</p>
        <p className='blogSpan'>Published By <span>TRX-LABORATORY</span> | on <span>5/2/2024</span></p>
        </div>
    </div>
  )
}
