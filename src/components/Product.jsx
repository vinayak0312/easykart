import React from "react";
import { Link } from "react-router-dom";
function Product(data) {
  return (
    <div className="p-3 flex flex-col justify-between gap-3 border relative">
      <img className="max-w-60 max-h-60" src={data.image} />
      <div className="flex flex-col gap-3">
        <h2 className="text-gray-400">{data.category}</h2>
        <h1 className="text-xl">{data.name}</h1>
        <h2 className="text-gray-800">Rating: {data.rate}/5</h2>
        <div className="flex items-center">
          <img src="src/star-stroke-rounded.svg" alt="rating"></img>
          <img src="src/star-stroke-rounded.svg" alt="rating"></img>
          <img src="src/star-stroke-rounded.svg" alt="rating"></img>
          <img src="src/star-stroke-rounded.svg" alt="rating"></img>
          <img src="src/star-stroke-rounded.svg" alt="rating"></img>
        </div>
        <h2 className="text-gray-800 font-bold">Price: ${data.price}</h2>
        <Link
          className="border rounded-md self-start py-1 px-4 bg-orange-500 text-white"
          to={"/product/" + data.id}
        >
          View Detail
        </Link>
      </div>
    </div>
  );
}

export default Product;
