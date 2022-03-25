import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Corporate from "./containers/Corporate";
import Home from "./containers/Home";
import Example from "./staticCard";
import AdLanding from "./components/Admin/AdLanding";
import Categories from "./components/Admin/categories";
import Products from "./components/Admin/products";
import AddProduct from "./components/Admin/AddProduct";
import Dashboard from "./components/Admin/Dashboard";
import Settings from "./components/Admin/settings";
import StaticPage from "./components/Admin/staticPage";
import InternetServices from "./containers/InternetServices";
import Marketplace from "./containers/Marketplace"
import NetworkEquipments from "./containers/NetworkEquipments";
import Promotions from "./containers/Promotions";
import OtherProducts from "./containers/OtherProducts";
import ClientRegistration from "./containers/ClientRegistration";
import CPE from "./containers/CPE";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Corporate />} />
        <Route path="/home" element={<Home />} />
         {/* <Route path="/ex" element={<Example />} /> */}

         {/* <Route path="/admin" element={<AdLanding/>}> */}
         <Route path="/network-equipments" element={<NetworkEquipments />}/>
         <Route path="/marketplace" element={<Marketplace/>}/>
         <Route path="/internet-services" element={<InternetServices />} />

         <Route path="/promotions" element={<Promotions />} />
         <Route path="/otherproducts" element={<OtherProducts />} />
          <Route path="/admin" element={<AdLanding/>}>
         <Route path="/register" element={<ClientRegistration />} />
         <Route path="/cpe" element={<CPE />} />
         {/* <Route path="/admin" element={<AdLanding/>}>
         <Route path="" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />}/>
            <Route path="products/newproduct" element={<AddProduct />} />
            <Route path="staticpages" element={<StaticPage />} />
            <Route path="settings" element={<Settings />} />
           </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
