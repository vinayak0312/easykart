import React, { useEffect, useMemo, useState, useCallback } from "react";
import Products from "./Products.jsx";
import NoMatch from "../NoMatchFound.jsx";
import getData from "../Api.js";
import { ImSpinner6 } from "react-icons/im";
import SelfModifiedInput from "../SelfModifiedInput.jsx";

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
  useMemo(
    function () {
      if (flt !== "") {
        data = data.filter(function (item) {
          const categ = item.category.toLowerCase();
          const nme = item.title.toLowerCase();
          const filt = flt.toLowerCase();
          return categ.indexOf(filt) !== -1 || nme.indexOf(filt) !== -1;
        });
      }
    },
    [flt, data]
  );
  useMemo(
    function () {
      if (srt === "Low to high Price") {
        data.sort(function (x, y) {
          return x.price - y.price;
        });
      }
      if (srt === "High to low Price") {
        data.sort(function (x, y) {
          return y.price - x.price;
        });
      }
      if (srt === "Rating") {
        data.sort(function (x, y) {
          return y.rating - x.rating;
        });
      }
      if (srt === "Category") {
        data.sort(function (x, y) {
          return y.category > x.category ? -1 : 1;
        });
      }
    },
    [srt, data]
  );
  const sortMethod = useCallback(
    function (event) {
      setsrt(event.target.value);
    },
    [srt]
  );
  const Filtered = useCallback(
    function (event) {
      setflt(event.target.value);
    },
    [flt]
  );
  if (ProductList.length === 0) {
    return <ImSpinner6 className="text-6xl mx-auto w-full animate-spin" />;
  }
  return (
    <div id="main" className="bg-gray-200 min-h-screen p-4">
      <div className="flex flex-col gap-5 my-10 mx-auto bg-white w-full max-w-4xl p-6 md:p-8 lg:p-10 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <SelfModifiedInput
            type="text"
            label="Filter"
            labelClasses="sr-only"
            id="filter"
            extraClasses="border py-2 rounded-md border-gray-500 px-3 w-full sm:max-w-xs"
            placeholder="Filter by category or title"
            onChange={Filtered}
          />
          <select
            onChange={sortMethod}
            value={srt}
            className="border py-2 rounded-md border-gray-500 px-3 w-full sm:w-auto"
          >
            <option>Default</option>
            <option>Low to high Price</option>
            <option>High to low Price</option>
            <option>Category</option>
            <option>Rating</option>
          </select>
        </div>
        <div>
          {data.length > 0 && <Products items={data} />}
          {data.length === 0 && <NoMatch />}
        </div>
        <div className="flex gap-2 justify-center">
          <a
            className="px-2 border text-red-500 border-red-500 rounded-sm"
            href="#"
          >
            1
          </a>
          <a
            className="px-2 border text-red-500 border-red-500 rounded-sm"
            href="#"
          >
            2
          </a>
          <a
            className="px-2 border text-red-500 border-red-500 rounded-sm"
            href="#"
          >
            3
          </a>
          <a
            className="px-2 border text-red-500 border-red-500 rounded-sm"
            href="#"
          >
            →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
