import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShop } from "./features/details/detailsSlice";
import Dropdown from "react-dropdown";
import styled from "styled-components";
import "react-dropdown/style.css";
import "./App.css";

function App() {
  const shops = useSelector((state) => state.details.shops);
  // let filteredList = useSelector((state) => state.details.shops);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // shops
  // }, []);
  // • You can add a shop with its name, the area of the shop, the category of the shop, the opening and closing date of the shop
  // const [shopsList, setShopsList] = useState(shops);
  // console.log(shopsList);
  // let ;
  // const fulldate=new Date()
  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth();
  const todayDate = new Date().getDate();
  // const today = `${todayDate}-${todayMonth + 1}-${todayYear}`;
  const today = `${todayYear}-${todayMonth + 1}-${todayDate}`;
  // const today = Object(`${todayYear}-${todayMonth + 1}-${todayDate}`);
  const newToday = `${todayYear}-${todayMonth + 1}-${todayDate+2}`
  // 29/11/2022

  console.log(typeof today);
  console.log(today);
  console.log(newToday);
  console.log((today>newToday)?"large":"small")
  // console.log(fulldate);
  const [shopList, setShopList] = useState(shops);
  const [sName, setSName] = useState(null);
  const [sArea, setSArea] = useState(null);
  const [sCategory, setSCategory] = useState(null);
  const [sOpeningDate, setSOpeningDate] = useState(null);
  const [sClosingDate, setSClosingDate] = useState(null);
  const [filterArea, setFilterArea] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [shopStatus, setShopStatus] = useState(null);
  const area = [
    "Thane",
    "Pune",
    "Mumbai Suburban",
    "Nashik",
    "Nagpur",
    "Ahmednagar",
    "Solapur",
  ];
  const category = [
    "Grocery",
    "Butcher",
    "Baker",
    "Chemist",
    "Stationery shop",
  ];
  const shopListDiv = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // flexDirection:"column",
    flexWrap: "wrap",
  };
  // /////////////
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      sName == null ||
      sArea == null ||
      sCategory == null ||
      sOpeningDate == null ||
      sClosingDate == null
    )
      return;
    const opDate = new Date(sOpeningDate);
    const clDate = new Date(sClosingDate);
    console.log(typeof opDate);
    //Bad condition checking
    // if (
    // sClosingDate[9] >= sOpeningDate[9] &&
    // sClosingDate[8] >= sOpeningDate[8] &&
    // sClosingDate[7] >= sOpeningDate[7] &&
    // sClosingDate[6] >= sOpeningDate[6] &&
    // sClosingDate[4] >= sOpeningDate[4] &&
    // sClosingDate[3] >= sOpeningDate[3] &&
    // sClosingDate[1] >= sOpeningDate[1] &&
    // sClosingDate[0] >= sOpeningDate[0]
    // )
    if (opDate < clDate) {
      // setShopsList([
      //   ...shopsList,
      //   {
      //     sName,
      //     sArea,
      //     sCategory,
      //     sOpeningDate,
      //     sClosingDate,
      //   },
      // ]);
      // {() => {
      // let status;

      // return status;
      // }}
      if (today > opDate && today < clDate) {
        setShopStatus("open");
      } else setShopStatus("close");
      dispatch(
        addShop({
          id: shops[shops.length - 1] ? shops[shops.length - 1].id + 1 : 0,
          sName,
          sArea,
          sCategory,
          sOpeningDate,
          sClosingDate,
          shopStatus,
          today,
        })
      );
    } else {
      alert("Closing date is less than the opening date");
    }
    // console.log(newShop);

    console.log(sOpeningDate.length);

    // 29/11/2022
    // console.log(sClosingDate.day());
  };
  const defaultOptionObj = area[0];
  // console.log(defaultOptionObj);
  const newShopClass = {
    backgroundColor: "#ede3e3",
    color: "#000",
    border: "2px solid white",
    borderRadius: "20px",
    margin: "10px",
  };
  const applyAreaFilter = () => {
    // dispatch(applyFilter(filterArea, filterCategory));
    let filterShops;
    filterShops = shops.filter((shop) => {
      if (shop.sArea == filterArea) {
        return shop;
      }
    });
    setShopList(filterShops);
  };
  const applyCategoryFilter = () => {
    // dispatch(applyFilter(filterArea, filterCategory));
    let filterShops;
    filterShops = shops.filter((shop) => {
      if (shop.sCategory == filterCategory) {
        return shop;
      }
    });
    setShopList(filterShops);
  };
  const applyBothFilter = () => {
    // dispatch(applyFilter(filterArea, filterCategory));
    let filterShops;
    filterShops = shops.filter((shop) => {
      if (shop.sArea == filterArea && shop.sCategory == filterCategory) {
        return shop;
      }
    });
    setShopList(filterShops);
  };
  const removeFilter = () => {
    // dispatch(applyFilter(filterArea, filterCategory));

    setShopList(shops);
  };
  const statusFilter = () => {
    // dispatch(applyFilter(filterArea, filterCategory));
    // setShopList(shops);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmitForm}>
        <label>Name </label>
        <input
          required
          type="text"
          placeholder="Enter shop name"
          value={sName || ""}
          onChange={(e) => {
            setSName(e.target.value);
          }}
        />
        <br />
        <Dropdown
          required
          className="myClassName"
          options={area}
          onChange={(e) => {
            setSArea(e.value);
          }}
          placeholder="Select Area of shop"
        />

        <br />
        <Dropdown
          required
          className="myClassName"
          options={category}
          onChange={(e) => {
            setSCategory(e.value);
          }}
          placeholder="Select category of shop"
        />
        <br />
        <label>opening </label>

        <input
          type="date"
          required
          placeholder="Enter shop opening"
          value={sOpeningDate || ""}
          onChange={(e) => {
            setSOpeningDate(e.target.value);
          }}
        />
        <br />
        <label>closing </label>
        <input
          type="date"
          required
          placeholder="Enter shop closing"
          value={sClosingDate || ""}
          onChange={(e) => {
            setSClosingDate(e.target.value);
          }}
        />
        <br />
        <br />

        <button type="submit">Add Shop</button>
      </form>
      <h2>List of all shops</h2>
      <Dropdown
        required
        className="myClassName"
        options={area}
        onChange={(e) => {
          setFilterArea(e.value);
        }}
        placeholder="Filter by Area"
      />{" "}
      <Dropdown
        required
        className="myClassName"
        options={category}
        onChange={(e) => {
          setFilterCategory(e.value);
        }}
        placeholder="Filter by category"
      />
      <button onClick={() => applyAreaFilter()}>Apply Area Filter</button>
      <button onClick={() => applyCategoryFilter()}>
        Apply Category Filter
      </button>
      <button onClick={() => applyBothFilter()}>
        Apply Both Together Filter
      </button>
      <button onClick={() => removeFilter()}>Remove Filter</button>
      <button onClick={() => statusFilter()}>Status Filter</button>
      <div style={shopListDiv}>
        {shopList.map((shop) => {
          return (
            <div key={Math.random() * 10000} style={newShopClass}>
              <h4>Shop Name : {shop.sName}</h4>
              <h4>Shop Area :{shop.sArea}</h4>
              <h4>Shop Category :{shop.sCategory}</h4>
              <h4>Shop Opening Date :{shop.sOpeningDate}</h4>
              <h4>Shop Closing Date:{shop.sClosingDate}</h4>
              <h4>Today Date:{shop.today}</h4>
              <h4>Shop Status:{shop.shopStatus}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
