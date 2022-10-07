import React, { useEffect, useState } from "react";
import Product from "../Components/Product";
import "./Main.css";
import { ProductData } from "../Data";
import { Link } from "react-router-dom";

//  category array
const Category = [
  "--Choose an option--",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
];
// size array
const Size = ["--Choose Size--", "M", "L", "XL"];

function Main() {
  const [selectedOption, setSelectedOption] = useState(Category[0]);
  const [product, setProduct] = useState(ProductData);
  const [size, setsize] = useState(ProductData);
  const [selectedSize, setSelectedSize] = useState(Size[0]);
  const [searchInput, setSearchInput] = useState("");

  // search product in product arary
  useEffect(() => {
    setProduct([]);
    ProductData.filter((item) => {
      `${item.title.toLowerCase()}`.includes(searchInput) &&
        setProduct((prev) => [...prev, item]);
    });
  }, [searchInput]);

  // handle category option
  const handleOption = (event) => {
    setSelectedSize(Size[0]);
    let CategoryName = event.target.value;
    if (CategoryName == Category[0]) {
      setProduct(ProductData);
    } else {
      setSelectedOption(CategoryName);
      setProduct([]);
      ProductData.map((item) => {
        if (item.category === CategoryName) {
          setProduct((prev) => [...prev, item]);
          setsize((prev) => [...prev, item]);
        }
      });
    }
  };

  // handle size option
  const handleSize = (event) => {
    let SizeName = event.target.value;
    setProduct(size);
    if (SizeName == Size[0]) {
      setProduct(product);
    } else {
      setSelectedSize(SizeName);
      setProduct([]);
      product.map((item) => {
        item.size == SizeName && setProduct((prev) => [...prev, item]);
      });
    }
  };

  // reset button
  const Reset = () => {
    setSelectedOption(Category[0]);
    setsize(product);
    setSelectedSize(Size[0]);
  };

  // get input from search input
  const handleSearchinput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <h1 className="main_title">E-commerce</h1>
      <div className="Header">
        <div className="header_left">
          {/* category  */}
          <select
            name="Category"
            id="category"
            value={selectedOption}
            onChange={handleOption}
          >
            {Category.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/* size  */}
          <select
            name="Size"
            id="size"
            value={selectedSize}
            onChange={handleSize}
          >
            {Size.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button className="header_reset" onClick={() => Reset()}>
            <i className="fa-solid fa-rotate-left"></i>
            Reset
          </button>
        </div>

        <div className="header_right">
          <div className="search_box">
            Search:{" "}
            <input
              type="text"
              placeholder=""
              value={searchInput}
              onChange={handleSearchinput}
            />
          </div>
          <Link to="/checkout">
            <button className="header_cart">Add to Cart</button>
          </Link>
        </div>
      </div>
      <Product product={product} />
    </div>
  );
}

export default Main;
