import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFolderOpen, FaBoxOpen } from "react-icons/fa";
import { BiGitBranch } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";

export default function DashboardHome() {
  const [Cate, setCate] = useState([]);
  const [SubCate, setSubCate] = useState([]);
  const [Product, setProduct] = useState([]);
  const redirect = useNavigate();

  const CateURL = import.meta.env.VITE_CATEGORY_URL;
  const SubCateURL = import.meta.env.VITE_SUBCATEGORY_URL;
  const ProURL = import.meta.env.VITE_PRODUCT_URL;

  async function ShowCategoryCount() {
    try {
      const res = await axios.get(CateURL);
      setCate(res.data.records);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  async function ShowSubCategoryCount() {
    try {
      const res = await axios.get(SubCateURL);
      setSubCate(res.data.records);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  }

  async function ShowProductCount() {
    try {
      const res = await axios.get(ProURL);
      setProduct(res.data.records);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  useEffect(() => {
    ShowCategoryCount();
    ShowSubCategoryCount();
    ShowProductCount();
  }, []);

  let result = 0;
  for (let i = 0; i < Product.length; i++) {
    let finalPrice = Number(Product[i].p_price);
    result += finalPrice;
  }

  const stats = [
    {
      title: "Categories",
      loc: "categoryView",
      icon: <FaFolderOpen />,
      count: Cate.length,
      badge: "Total categories",
    },
    {
      title: "Subcategories",
      loc: "subcategoryView",
      icon: <BiGitBranch />,
      count: SubCate.length,
      badge: "Subcategory count",
    },
    {
      title: "Products",
      loc: "productView",
      icon: <FaBoxOpen />,
      count: Product.length,
      badge: "Active products",
    },
    {
      title: "Investments",
      loc: "productView",
      icon: <GiTakeMyMoney />,
      count: "₹" + result,
      badge: "Total price sum",
    },
  ];

  return (
    <main className="admin-main">
      <div className="container-fluid py-3 px-3 px-md-4">
        <div className="row g-3">
          {stats.map((item, index) => (
            <div
              className="col-12 col-sm-6 col-lg-3"
              onClick={() => redirect(`/${item.loc}`)}
              key={index}
              style={{ cursor: "pointer" }}
            >
              <div className="card admin-stat-card h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <p className="text-muted text-uppercase small mb-1">
                        {item.badge}
                      </p>
                      <h5 className="fw-semibold mb-0">{item.title}</h5>
                    </div>
                    <div className="admin-stat-icon rounded-circle d-flex align-items-center justify-content-center">
                      <span className="fs-4">{item.icon}</span>
                    </div>
                  </div>
                  <h3 className="fw-bold mb-0">{item.count}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
