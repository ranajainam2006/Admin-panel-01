import React from "react";
import { SiSecurityscorecard } from "react-icons/si";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const SideMenuBar = () => {
  return (
    <aside className="position-fixed sidebarmenu top-0 start-0 text-white d-flex flex-column">
      <div className="d-flex align-items-center py-3 px-4 sidebar-brand">
        <NavLink to="/DashboardView" className="d-flex align-items-center text-white text-decoration-none">
          <img
            src="/fabrixa-logo.png"
            alt="Fabrixa Store"
            className="sidebar-logo me-2"
          />
    
        </NavLink>
      </div>

      <div className="flex-grow-1 d-flex flex-column">
        <div className="px-3 mt-2">
          <NavLink
            className="sidebar-link d-flex align-items-center gap-2"
            to="/DashboardView"
          >
            <AiOutlineDashboard className="fs-5" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <p className="text-secondary text-uppercase mb-2 mx-4 mt-4 fw-bold small">
          Management
        </p>

        <div className="accordion px-2" id="accordionExample">
          <div className="accordion-item bg-transparent border-0">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button rounded collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <BiCategory className="fs-5 text-secondary fw-semibold" />
                <span className="mx-2 fw-semibold">Category</span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className="submenu-link" to="/categoryadd">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="submenu-link" to="/categoryView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="accordion-item bg-transparent border-0 mt-2">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button rounded collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <BiCategory className="fs-5 text-secondary fw-semibold" />
                <span className="mx-2 fw-semibold">Subcategory</span>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className="submenu-link" to="/subcategory">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="submenu-link" to="/subcategoryView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="accordion-item bg-transparent border-0 mt-2">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button rounded collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <BiCategory className="fs-5 text-secondary fw-semibold" />
                <span className="mx-2 fw-semibold">Product</span>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className="submenu-link" to="/productAdd">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="submenu-link" to="/productView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideMenuBar;
