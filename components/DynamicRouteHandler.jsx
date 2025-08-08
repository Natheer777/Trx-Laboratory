import { useParams } from "react-router-dom";
// import VerifyProduct from "../pages/VerifyProduct";
import {Products} from "../src/pages/index";

export default function DynamicRouteHandler() {
    const { param } = useParams();
    const isNumber = /^\d+$/.test(param);
    return isNumber ? <VerifyProduct id={param} /> : <Products productName={param} />;
} 