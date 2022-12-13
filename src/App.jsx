import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShop, removeShop } from "./features/details/detailsSlice";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./App.css";
import { Footer } from "./components/Footer";

function App() {
  const shops = useSelector((state) => state.details.shops);
  const dispatch = useDispatch();
  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth();
  const todayDate = new Date().getDate();
  const today = new Date(`${todayYear}-${todayMonth + 1}-${todayDate}`);

  const [shopList, setShopList] = useState(shops);
  const [sName, setSName] = useState(null);
  const [sArea, setSArea] = useState(null);
  const [sCategory, setSCategory] = useState(null);
  const [sOpeningDate, setSOpeningDate] = useState(null);
  const [sClosingDate, setSClosingDate] = useState(null);
  const [filterArea, setFilterArea] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
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
  const status = ["OPEN", "CLOSE"];
  const shopListDiv = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "20px",
    padding: "5px",
  };

  // /////////////
  const handleSubmitForm = (e) => {
    // e.preventDefault();
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
    let shopStatus;
    if (today >= opDate && today < clDate) {
      shopStatus = "OPEN";
      console.log("open");
    } else {
      shopStatus = "CLOSE";
      console.log("close");
    }
    console.log(today);

    if (opDate < clDate) {
      dispatch(
        addShop({
          id: shops[shops.length - 1] ? shops[shops.length - 1].id + 1 : 0,
          sName,
          sArea,
          sCategory,
          sOpeningDate,
          sClosingDate,
          shopStatus,
        })
      );
    } else {
      alert(
        "Closing date is less than the opening date. Closing date should be more than the opening date"
      );
    }
  };

  const applyAreaFilter = () => {
    let filterShops;
    filterShops = shops.filter((shop) => {
      if (shop.sArea == filterArea) {
        return shop;
      }
    });
    setShopList(filterShops);
  };
  const applyCategoryFilter = () => {
    let filterShops;
    filterShops = shops.filter((shop) => {
      if (shop.sCategory == filterCategory) {
        return shop;
      }
    });
    setShopList(filterShops);
  };
  const applyAllFilter = () => {
    let filterShops;
    filterShops = shops.filter((shop) => {
      if (
        shop.sArea == filterArea &&
        shop.sCategory == filterCategory &&
        shop.shopStatus == filterStatus
      ) {
        return shop;
      }
    });
    setShopList(filterShops);
  };
  const removeFilter = () => {
    setShopList(shops);
  };
  const statusFilter = () => {
    let filterShops;
    filterShops = shops.filter((shop) => {
      if (shop.shopStatus == filterStatus) {
        return shop;
      }
    });
    setShopList(filterShops);
  };
  const removeShop = (shopID) => {
    console.log(shopID);
    dispatch(removeShop(shopID));
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmitForm}>
        <label>Name : </label>
        <input
          required
          type="text"
          placeholder="Enter shop name"
          value={sName || ""}
          onChange={(e) => {
            const re = /^[A-Za-z]+$/;

            if (e.target.value == " " || re.test(e.target.value)) {
              setSName(e.target.value);
            }
          }}
        />
        <br />
        <label>Area : </label>

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
        <label>Category : </label>

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
        <label>Opening Date : </label>

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
        <label>Closing Date : </label>
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
      <h1>---- List of all shops ----</h1>
      <Dropdown
        required
        className="myClassName"
        options={area}
        onChange={(e) => {
          setFilterArea(e.value);
        }}
        placeholder="Filter by Area"
      />
      <Dropdown
        required
        className="myClassName"
        options={category}
        onChange={(e) => {
          setFilterCategory(e.value);
        }}
        placeholder="Filter by category"
      />
      <Dropdown
        required
        className="myClassName"
        options={status}
        onChange={(e) => {
          setFilterStatus(e.value);
        }}
        placeholder="Filter by Status"
      />
      <button onClick={() => applyAreaFilter()}>Apply Area Filter</button>
      <button onClick={() => applyCategoryFilter()}>
        Apply Category Filter
      </button>
      <button onClick={() => statusFilter()}>Status Filter</button>

      <button onClick={() => applyAllFilter()}>
        Apply All Filters togehter
      </button>
      <button onClick={() => removeFilter()}>Remove Filter</button>
      <div style={shopListDiv}>
        {shopList.length > 0 ? (
          shopList.map((shop) => {
            return (
              <div key={Math.random() * 100} className="newShopClass">
                <h4>Shop Name : {shop.sName}</h4>
                <h4>Area :{shop.sArea}</h4>
                <h4>Category :{shop.sCategory}</h4>
                <h4>Opening Date :{shop.sOpeningDate}</h4>
                <h4> Closing Date:{shop.sClosingDate}</h4>
                <h4>Shop Status: {shop.shopStatus}</h4>
                <button onClick={() => removeShop(shop.id)}>Remove shop</button>
              </div>
            );
          })
        ) : (
          <h2>No shops </h2>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
