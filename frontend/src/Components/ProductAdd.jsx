import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductAdd() {
  const { register, handleSubmit, reset } = useForm();

  const [ProductSubCate, setProductSubCate] = useState([]);

  console.log("ProductSubCate", ProductSubCate);

  const URL = import.meta.env.VITE_PRODUCT_URL;
  const CateURL = import.meta.env.VITE_CATEGORY_URL;
  const SubCateURL = import.meta.env.VITE_SUBCATEGORY_URL;

  const { id } = useParams();
  let redirect = useNavigate();
  let date = new Date();
  const CreateDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  //  Product URL
  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`);
    console.log("Product BY ", res.data.product);

    const product = res.data.product;
    reset({
      ...product,
      category_id: product.category_id._id,
      subcategory_id: product.subcategory_id._id,
    });
  }

  // category / subcategory list
  async function ShowDataSubCategory() {
    const res = await axios.get(SubCateURL);
    setProductSubCate(res.data.records);
  }

  useEffect(() => {
    ShowData();
    ShowDataSubCategory();
  }, []);

  async function addProduct(data) {
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("subcategory_id", data.subcategory_id);
    formData.append("p_name", data.p_name);
    formData.append("p_price", data.p_price);
    if (file) {
      formData.append("p_image", file);
    }

    if (id == null) {
      const res = await axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success === false) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
        return;
      }
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Product Added!",
        showConfirmButton: true,
        timer: 3000,
      });

      reset();
      setPreview("");
      setFile(null);
    } else {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Product Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
    }
    redirect("/productView");
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit(addProduct)}
      className="rounded mx-4 mt-4 admin-form-card"
      encType="multipart/form-data"
    >
      <div className="admin-form-header d-flex justify-content-between align-items-center">
        <h1 className="text-white fs-6 fw-semibold mb-0">
          {id == null ? "Add Product" : "Update Product"}
        </h1>
      </div>

      <div className="px-3 pb-3 pt-2">
        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold small">
            Category
          </label>
          <select
            className="form-select form-select-sm custom-input admin-input"
            {...register("category_id")}
            required
          >
            <option disabled>--Select Category--</option>
            {ProductSubCate.map((ele, index) => (
              <option key={index} value={ele.category_id._id}>
                {ele.category_id.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold small">
            Subcategory
          </label>
          <select
            className="form-select form-select-sm custom-input admin-input"
            {...register("subcategory_id")}
            required
          >
            <option disabled>--Select Sub Category--</option>
            {ProductSubCate.map((ele, index) => {
              return (
                <option key={index} value={ele._id}>
                  {ele.sub_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold small">
            Product Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm custom-input admin-input"
            placeholder="Enter product name"
            {...register("p_name")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold small">
            Product Price (₹)
          </label>
          <input
            type="text"
            className="form-control form-control-sm custom-input admin-input"
            placeholder="Enter product price"
            {...register("p_price")}
            required
          />
        </div>

        <button
          className={
            id == null
              ? "btn btn-primary btn-sm rounded-pill px-4"
              : "btn btn-update btn-sm rounded-pill px-4"
          }
        >
          {id == null ? "Add Product" : "Update Product"}
        </button>
      </div>
    </form>
  );
}
