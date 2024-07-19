import React from "react";
import Product from "./Product.jsx";
function Products({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(function (item) {
        return (
          <Product
            image={item.images[0]}
            category={item.category}
            name={item.title}
            rate={item.rating}
            price={item.price}
            id={item.id}
          />
        );
      })}
    </div>
  );
}

export default Products;
