import './OUR_TABLETS.css'
import { useState , useEffect } from 'react';
import axios from 'axios'
export default function OUR_TABLETS() {
   const [data, setData] = useState([]);
  
    useEffect(() => {
      axios
        .get("https://trx-laboratory.com/get_tablet_products.php")
        .then((res) => setData(res.data.data))
        .catch((err) => console.error(err));
    }, []);
  return (
    <>
    <div className="OUR_INJECTABLES">
        <div className="borderOur">
        <h5>CHECK OUT!</h5>
        <ul>
            <li>OUR TABLETS</li>
            <li>TABLET 100</li>
        </ul>
        </div>
        <div className="ProductsInjec container">
        <div className="All_Product">
        {data.map((item) => (
          <div key={item.id} className="All_Product_items hidden">
            <div className="product-card p-4 shadow-sm ">
              <img loading="lazy" src={item.img_url} alt="" />
              <h2>{item.pname}</h2>
              <p className="mb-4">
                <strong>Price:</strong> {item.price}$
              </p>
              <a
                className="Link_Product"
                href={`${item.qr_code}?from=internal`}
                target="_blank"
              >
                read more
              </a>

            </div>
          </div>
        ))}
      </div>
        </div>
    </div>
    </>
  )
}
