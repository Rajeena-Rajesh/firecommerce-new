import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";


function ProductInfo() {
  const [product, setProduct] = useState();
  const params = useParams()
  const[loading,setLoading]=useState(false)

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      // axios.get("http://localhost:4000/fireproducts").then((response) => {
      //   console.log(response.data);
      //   setProduct(response.data)
setLoading(true)
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );

      setProduct(productTemp.data());
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <Layout loading={loading}>
      
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 ">
          {product && (<div>
            <p><b>{product.name}</b></p>
            <img src={product.imageURL} alt="" className="product-img-info" />
            <hr />
            <p>{product.description}</p>
            
          </div>
          
          )}
          
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default ProductInfo;
