import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productsList = useSelector((state) => state.products);

  const product = productsList.find(
    (newProduct) => newProduct.id === Number(id)
  );
  const relateProduct = productsList.filter(
    (productItem) =>
      productItem.category.id === product.category.id &&
      productItem.id !== product.id
  );

  return (
    <div>
      <div>
        <h1>{product?.title}</h1>
        <img src={product?.productImgs[0]} />
        <p>{product?.description}</p>
        <h2>Price: {product?.price}</h2>
      </div>
      <div>
        <br />
        <h2>----- Related Product -----</h2>
        <br />
        {relateProduct.map((related) => (
          <div key={related.id}>
            <Link to={`/products/${related.id}`}>
              <h2>{related.title}</h2>
              <img src={related.productImgs[0]} alt="" />
              <h3>Price: ${related.price}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
