import React from "react";
import SideMenuBar from "./Components/SideBar";
import DashboardNav from "./Components/DashboardNav";
import CreateCategory from "./Components/CreateCategory";
import ProductList from "./Pages/ProductList";
import SubCategory from "./Components/SubCategoryAdd";
import ProductAdd from "./Components/ProductAdd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubCategoryList from "./Pages/SubcategoryList";
import CategoryList from "./Pages/CategoryList";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Css/style.css";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/Login";
import VerifyOtp from "./Components/verifyOtp";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

        <section className="appSection">
          <Routes>
            <Route
              path="/DashboardView"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav /> <Home />
                </>
              }
            />
            <Route
              path="/categoryadd"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Category Add" />{" "}
                  <CreateCategory />{" "}
                </>
              }
            />
            <Route
              path="/subcategory"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Sub-Category Add" />{" "}
                  <SubCategory />{" "}
                </>
              }
            />
            <Route
              path="/productAdd"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Product Add" />{" "}
                  <ProductAdd />
                </>
              }
            />
            <Route
              path="/categoryView"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Category View" />{" "}
                  <CategoryList title="View Category" />{" "}
                </>
              }
            />
            <Route
              path="/subcategoryView"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Sub-Category View" />{" "}
                  <SubCategoryList title="View Sub Category" />
                </>
              }
            />
            <Route
              path="/productView"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Product View" />{" "}
                  <ProductList title="View Product" />{" "}
                </>
              }
            />
            <Route
              path="/category/:id"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Category Add" />{" "}
                  <CreateCategory />{" "}
                </>
              }
            />
            <Route
              path="/subcategory/:id"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Sub-Category Add" />{" "}
                  <SubCategory />{" "}
                </>
              }
            />
            <Route
              path="/product/:id"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <DashboardNav title="Product Add" />{" "}
                  <ProductAdd />
                </>
              }
            />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
}
