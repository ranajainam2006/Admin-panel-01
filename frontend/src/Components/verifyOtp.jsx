import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function VerifyOtp() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate();

  const URL = import.meta.env.VITE_USER_AUTH;

  async function verifyOtp(data) {
    {
      try {
        const res = await axios.post(`${URL}/verifyotp`, data);
        console.log(res.data);
        
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
          reset();
          redirect("/login");
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
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="text-center pt-4">
              <h4>Verify OTP</h4>
              <p className="text-muted">Enter OTP sent to your email</p>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit(verifyOtp)}>
                <div className="mb-3">
                  <label className="fw-bold mb-1">OTP : </label>
                  <input
                    type="text"
                    className="form-control  fs-5"
                    placeholder="Enter 6 digit OTP"
                    maxLength={6}
                    {...register("otp", { required: true })}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
