import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const URL = import.meta.env.VITE_USER_AUTH;
  const redirect = useNavigate();

  async function signup(data) {
    try {
      const res = await axios.post(`${URL}/signup`, data, {
        withCredentials: true,
      });

      if (!res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
        redirect("/verifyotp");
        reset();
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: error.message,
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="auth-card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Left side - branding */}
                <div className="col-md-5 d-none d-md-flex flex-column justify-content-between auth-card-left p-4">
                  <div>
                    <h5 className="text-light mb-1">Admin Panel</h5>
                    <p className="text-light-50 mb-0">Create your account</p>
                  </div>
                  <div>
                    <h3 className="text-white fw-semibold mb-3">
                      Get Started 🚀
                    </h3>
                    <p className="text-light-50 small mb-0">
                      Register once and manage all your products, categories and
                      subcategories from a single dashboard.
                    </p>
                  </div>
                  <p className="text-light-50 small mb-0">
                    Secure email verification with OTP.
                  </p>
                </div>

                {/* Right side - form */}
                <div className="col-md-7 bg-white p-4 p-md-5">
                  <div className="mb-3 text-center text-md-start">
                    <h4 className="fw-semibold mb-1">Create account</h4>
                    <p className="text-muted mb-0 small">
                      Fill in your details to sign up for the admin panel.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(signup)}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Full name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm auth-input"
                        placeholder="Enter your name"
                        {...register("name")}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-sm auth-input"
                        placeholder="you@example.com"
                        {...register("email")}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-sm auth-input"
                        placeholder="Create a password"
                        {...register("password")}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm auth-input"
                        placeholder="Enter your mobile number"
                        {...register("mobile")}
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm px-4 rounded-pill"
                      >
                        Register
                      </button>

                      <span className="small text-muted">
                        Already have an account?{" "}
                        <NavLink to={"/login"} className="auth-link">
                          Login
                        </NavLink>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
