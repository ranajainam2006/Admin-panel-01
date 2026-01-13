import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubCategory() {
  const { register, handleSubmit, reset } = useForm();
  const [SubCate, setSubCate] = useState([]);
  const URL = import.meta.env.VITE_SUBCATEGORY_URL;
  const CATEURL = import.meta.env.VITE_CATEGORY_URL;
  let date = new Date();
  let { id } = useParams();
  let redirect = useNavigate();

  const currentDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  // Sub Category
  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`);
    console.log("My Res", res.data.subCategory);
    reset(res.data.subCategory);
  }

  // Category
  async function ShowDataCateGory() {
    const res = await axios.get(CATEURL);
    setSubCate(res.data.records);
  }

  // Sub Category Add and Update 
  async function addSubcategory(data) {
    if (id == null) {
      const res = await axios.post(URL, { currentDate, ...data });
      console.log("res", res);
      if (res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Sub-Category Added!",
          showConfirmButton: true,
          timer: 3000,
        });
        reset({
          subCategorySelect: "--select Category--",
          subCategory_name: "",
        });
        redirect("/subcategoryView");
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
      }
    } else {
      await axios.put(`${URL}/${id}`, { currentDate, ...data });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Sub-Category Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
      reset({ subCategorySelect: "--select Category--", subCategory_name: "" });
      redirect("/subcategoryView");
    }
  }

  useEffect(() => {
    ShowData();
    ShowDataCateGory();
  }, []);

  return (
    <form
      method="post"
      className="rounded mx-4 mt-4 admin-form-card"
      onSubmit={handleSubmit(addSubcategory)}
    >
      <div className="admin-form-header d-flex justify-content-between align-items-center">
        <h1 className="text-white fs-6 fw-semibold mb-0">
          {id == null ? "Add Sub Category" : "Update Sub Category"}
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
            <option value="--select Category--" disabled>
              --select Category--
            </option>
            {SubCate.map((ele, index) => {
              return (
                <option key={index} value={ele._id}>
                  {ele.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold small">
            Sub Category Name
          </label>
          <input
            {...register("sub_name")}
            type="text"
            className="form-control form-control-sm custom-input admin-input"
            placeholder="Enter sub category name"
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
          {id == null ? "Add Sub Category" : "Update Sub Category"}
        </button>
      </div>
    </form>
  );
}
