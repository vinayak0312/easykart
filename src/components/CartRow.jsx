import React, { useEffect, useState } from "react";
import { getProduct } from "../Api";

function CartProductDetail({ id, quantity, updateQuantity }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  if (!product) {
    return null;
  }

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(id, quantity - 1);
  };

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <div className="flex items-center gap-4 flex-1">
          <img
            className="border max-w-16 max-h-16"
            src={product.images[0]}
            alt={product.title}
          />
          <h2 className="font-bold text-xl text-orange-600">{product.title}</h2>
        </div>
        <h2 className="bold text-xl flex-1 text-center">
          ${product.price.toFixed(2)}
        </h2>
        <div className="flex items-center flex-1 justify-center">
          <button className="px-2" onClick={handleDecrease}>
            <span className="material-symbols-outlined">do_not_disturb_on</span>
          </button>
          <input
            type="number"
            className="border py-2 px-4 text-center w-20"
            value={quantity}
            onChange={handleChange}
          />
          <button className="px-2" onClick={handleIncrease}>
            <span className="material-symbols-outlined">add_circle</span>
          </button>
        </div>
        <h2 className="bold text-xl flex-1 text-right">
          ${(product.price * quantity).toFixed(2)}
        </h2>
      </div>
    </>
  );
}

export default CartProductDetail;
