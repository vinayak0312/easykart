import React, { useEffect, useState } from "react";
import Products from "./Products.jsx";
import NoMatch from "../NoMatchFound.jsx";
import getData from "../Api.js";
import { ImSpinner6 } from "react-icons/im";

function Home() {
  const [ProductList, setLists] = useState([]);
  useEffect(function () {
    let prlist = getData();
    prlist.then(function (products) {
      setLists(products);
    });
  }, []);
  const [srt, setsrt] = useState("Default");
  const [flt, setflt] = useState("");
  let data = [...ProductList];
  data = data.filter(function (item) {
    const categ = item.category.toLowerCase();
    const nme = item.title.toLowerCase();
    const filt = flt.toLowerCase();
    return categ.indexOf(filt) != -1 || nme.indexOf(filt) != -1;
  });

  if (srt == "Low to high Price") {
    data.sort(function (x, y) {
      return x.price - y.price;
    });
  }
  if (srt == "High to low Price") {
    data.sort(function (x, y) {
      return y.price - x.price;
    });
  }
  if (srt == "Rating") {
    data.sort(function (x, y) {
      return y.rating - x.rating;
    });
  }
  if (srt == "Category") {
    data.sort(function (x, y) {
      return y.category > x.category ? -1 : 1;
    });
  }
  function sortMethod(event) {
    const newValue = event.target.value;

    setsrt(newValue);
  }
  function Filtered(event) {
    setflt(event.target.value);
  }
  if (ProductList.length == 0) {
    return <ImSpinner6 className="text-6xl mx-auto w-full animate-spin" />;
  }
  return (
    <div id="main" class="bg-gray-200">
      <div className="flex flex-col gap-5 my-10 mx-auto bg-white w-[80vw] p-[108px]">
        <div className="flex justify-between">
          <input
            className="border px-2 py-1"
            type="text"
            placeholder="Filter By category or title"
            onChange={Filtered}
          />
          <select onChange={sortMethod} value={srt}>
            <option>Default</option>
            <option>Low to high Price</option>
            <option>High to low Price</option>
            <option>Category</option>
            <option>Rating</option>
          </select>
        </div>
        <div>
          {data.length > 0 && <Products items={data} />}
          {data.length == 0 && <NoMatch />}
        </div>
        <div className="flex gap-2">
          <a
            className="px-2  border text-red-500 border-red-500 rounded-sm"
            href=""
          >
            1
          </a>
          <a
            className="px-2  border text-red-500 border-red-500 rounded-sm"
            href=""
          >
            2
          </a>
          <a
            className="px-2  border text-red-500 border-red-500 rounded-sm"
            href=""
          >
            3
          </a>
          <a
            className="px-2  border text-red-500 border-red-500 rounded-sm"
            href=""
          >
            →
          </a>
        </div>
      </div>
    </div>
  );
}
export default Home;
