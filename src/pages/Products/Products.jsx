import { Details_product, Footer, Navbar, Verfiy_product, WhyChoos } from "../../sections";
import { useParams } from "react-router-dom";
export default function Products() {
  const { param } = useParams();
  return (
    <>
      <Navbar />
      <Details_product productName={param} />
      <WhyChoos />
      <Verfiy_product />
      <Footer />
    </>
  );
}
