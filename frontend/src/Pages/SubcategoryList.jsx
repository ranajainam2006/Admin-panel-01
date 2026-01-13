import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubCategoryList(props) {
  const URL = import.meta.env.VITE_SUBCATEGORY_URL;

  const [SubCate, setSubCate] = useState([]);

console.log(SubCate)

  async function ShowData() {
    const res = await axios.get(URL);
    setSubCate(res.data.records);
  }
   function Trash(id) {
     Swal.fire({
      title: "Do You Want to Delete Sub-Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sub-Category Deleted!",
          icon: "success",
        });
        await axios.delete(`${URL}/${id}`);
        ShowData();
      } else {
        Swal.fire({
          title: "Not Delete!",
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    ShowData();
  }, []);
  return (
    <>
      <div className="m-4 rounded-top admin-table-wrapper">
        <div className="d-flex justify-content-between align-items-center px-3 py-2">
          <h1 className="text-white fs-6 fw-semibold mb-0">{props.title}</h1>
          <span className="badge bg-primary-subtle text-primary small">
            Total: {SubCate.length}
          </span>
        </div>
        <table className="table table-dark mb-0 admin-table">
          <thead>
            <tr className="table-active text-center">
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Sub Category</th>
              <th scope="col">Date</th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {SubCate.map((ele, index) => {
              return (
                <tr
                  className="text-center align-middle"
                  style={{ backgroundColor: "transparent" }}
                  key={index}
                >
                  <th scope="row">{index + 1}</th>
                  <td className="text-start">{ele?.category_id?.name}</td>
                  <td className="text-start">{ele.sub_name}</td>
                  <td>
                    {ele.createdAt
                      ? new Date(ele.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="text-center">
                    <NavLink
                      to={`/subcategory/${ele._id}`}
                    className="btn btn-sm btn-update me-2"
                    >
                      <AiFillEdit className="fs-5" />
                    </NavLink>
                    <button
                    className="btn btn-sm btn-delete"
                      onClick={() => Trash(ele._id)}
                    >
                      <AiFillDelete className="fs-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
