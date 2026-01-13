import React from "react";
import { FaBars } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Dashboard(props) {
  const redirect = useNavigate();
  const Logout_URL = import.meta.env.VITE_USER_AUTH;

  async function logout() {
    const res = await axios.get(`${Logout_URL}/logout`);
    if (res.data.success) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: true,
        timer: 3000,
      });

      redirect("/");
    } else {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: res.data.message,
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <header className="admin-header shadow-sm">
      <div className="admin-header-top d-flex justify-content-between align-items-center px-3 px-md-4">
        <div className="d-flex align-items-center gap-2">
          <NavLink to="/DashboardView" className="text-decoration-none">
            <FaBars className="text-secondary fs-4" />
          </NavLink>
          <div>
            <h6 className="mb-0 text-white fw-semibold">Admin Dashboard</h6>
            <small className="text-muted-50">
              {props.title || "Overview and statistics"}
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <BsMoon className="fs-5 text-muted-50 d-none d-md-inline" />
          <button
            className="btn btn-sm btn-outline-light rounded-pill px-3"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-breadcrumb px-3 px-md-4 py-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item">
              <NavLink to="/DashboardView" className="text-decoration-none">
                Home
              </NavLink>
            </li>
            {props.title && (
              <li
                className="breadcrumb-item active text-secondary fw-semibold"
                aria-current="page"
              >
                {props.title}
              </li>
            )}
          </ol>
        </nav>
      </div>
    </header>
  );
}
