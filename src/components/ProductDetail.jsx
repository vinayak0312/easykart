import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { getProduct } from "../Api";
import { ImSpinner6 } from "react-icons/im";
import Error from "../Error";

function Detail({handleCart}) {
  const param = useParams();
  const id = param.id;

  const [product, setp] = useState();
  const [loading, setload] = useState(true);
  const [count, setCount] = useState(1);

  function setCart(event) {
    setCount(+event.target.value);
  }

  function changeCart() {
    handleCart(id, count);
  }

  useEffect(
    function () {
      const p = getProduct(id);
      p.then(function (data) {
        setp(data);
        setload(false);
        setCount(1);
      }).catch(function () {
        setload(false);
      });
    },
    [id]
  );
  if (loading) {
    return (
      <div className="text-6xl self-center">
        <ImSpinner6 className="animate-spin" />
      </div>
    );
  }
  if (!product) {
    return <Error />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Link
        className="mx-2 flex self-start px-2 h-7 mb-4 font-bold text-2xl items-center"
        to="/"
      >
        <MdOutlineArrowBackIos /> Back
      </Link>
      <div className="mx-auto bg-white border rounded-lg overflow-hidden my-8 flex w-[60vw] p-8 h-[60vh] ">
        <img
          className="w-[30vw] h-[50vh]"
          src={product.images[0]}
          alt={product.title}
        />
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
          <p className="text-lg text-gray-700 mt-2">${product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="mt-6 flex">
            <input
              type="number"
              onChange={setCart}
              value={count}
              className="w-16 p-2 border border-gray-300 rounded-md"
              min="1"
            />
            <button
              onClick={changeCart}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-10 mx-2 w-full">
        <div>
          {id > 1 && (
            <Link
              className="flex border px-3 py-2 bg-orange-500 text-white rounded-md"
              to={`/product/${parseInt(product.id) - 1}`}
            >
              <MdOutlineArrowBackIos className="text-2xl font-bold" /> Previous
            </Link>
          )}
        </div>
        <Link
          className="flex border px-3 py-2 bg-orange-500 text-white rounded-md"
          to={`/product/${parseInt(product.id) + 1}`}
        >
          Forward
          <MdOutlineArrowForwardIos className="text-2xl font-bold" />
        </Link>
      </div>
    </div>
  );
}

export default Detail;
