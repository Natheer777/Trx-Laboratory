import { useState, useEffect } from 'react';
import axios from 'axios';
import ShinyText from '../../components/ShinyText/ShinyText';
import './TOP_SEARCH.css'

export default function TOP_SEARCH() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const productNames = ["test-e", "test-p"];
                const videoPromises = productNames.map(name => 
                    axios.post('https://trx-laboratory.com/get_product_by_name.php', { name })
                );

                const responses = await Promise.all(videoPromises);
                const validVideos = responses
                    .filter(response => response.data.status === 'success' && response.data.data[0]?.vid_url)
                    .map(response => response.data.data[0]);
                
                setVideos(validVideos);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <div className="catego topSearch mb-5">
            
            <h1 className='mb-5'>
                <ShinyText 
                    text="TOP SEARCH" 
                    speed={3}
                    className='shiny-heading'
                />
            </h1>
            <div className="videos-grid">
                {videos.map((product, index) => (
                    <div key={index} className="video-container">
                        {product.vid_url && (
                            <div className="video-wrapper">
                                <video 
                                    src={product.vid_url}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="product-video"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <div className="product-name-overlay">
                                    <h3 className="product-name">{product.pname || 'Product'}</h3>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
