import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateCategory() {
  const { register, handleSubmit, reset } = useForm();
  let redirect = useNavigate();
  const URL = import.meta.env.VITE_CATEGORY_URL;
  let date = new Date();

  const CreateDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  const { id } = useParams();  // Only Use in Params id
  console.log(id)

  // const [searchParams] = useSearchParams(); // Use in query id
  // const id = searchParams.get("id");

  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`);
    console.log("res ok", res.data)
    reset(res.data.category);
  }

  useEffect(() => {
    ShowData();
  }, [id]);

  async function addcategory(data) {
    if (id == null) {
      try {
        const res = await axios.post(URL, { CreateDate, ...data });
        if (res.data.success) {
          reset();
          redirect("/categoryView");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Category Added!",
            showConfirmButton: true,
            timer: 3000,
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: true,
            timer: 3000,
          });
        }
      } catch (err) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Error : ${err.message}`,
          showConfirmButton: true,
          timer: 3000,
        });
      }
    } else {
      await axios.put(`${URL}/${id}`, { updateDate: CreateDate, ...data });
      reset();
      redirect("/categoryView");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Category Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <form
      method="post"
      className="rounded mx-4 mt-4 admin-form-card"
      onSubmit={handleSubmit(addcategory)}
    >
      <div className="admin-form-header d-flex justify-content-between align-items-center">
        <h1 className="text-white fs-6 fw-semibold mb-0">
          {id == null ? "Add Category" : "Update Category"}
        </h1>
      </div>

      <div className="px-3 pb-3 pt-2">
        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold small">
            Category Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="form-control form-control-sm custom-input admin-input"
            placeholder="Enter category name"
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
          {id == null ? "Add Category " : "Update Category"}
        </button>
      </div>
    </form>
  );
}
