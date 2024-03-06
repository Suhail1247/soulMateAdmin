import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserManagement from "./userManagement/UserManagement";
import Sidebar from "./Sidebar";
import Update from "./Update";
import DeleteUser from "./DeleteUser";
import ViewUser from "./ViewUser";
import Navbar from "./Navbar";
 
function home() {
  const navigate = useNavigate();
  const [logout, setLogout] = useState();

  const [updateUser, setUpdateUser] = useState();
  const [viewUser, setViewUser] = useState();
  const [deleteUser, setDeleteUser] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;

      if (Date.now() >= expirationTime) {
        console.log("Token expired. Removing token.");
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  const logoutAction = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const cancelLogout = () => {
    setLogout(false);
  };
  
  //  logout

  const showUpdate = () => {
    setUpdateUser(true);
  };
  const showView = () => {
    setViewUser(true);
  };
  const showDelete = () => {
    setDeleteUser(true);
  };

  return (
    <>
      <div
        className="container-fluid "
        style={{
          height: "100vh",
          backgroundColor: "#36454F",
          overflow: "hidden",
        }}
      >
        <div className=" row  ">
          <Navbar />
          <div className="col-2 p-4 text-white">
            <Sidebar />
          </div>
          <div
            className="col-10 "
            style={{ backgroundColor: "#D3D3D3", height: "90vh" }}
          >
            {updateUser && <Update />}
            {viewUser && <ViewUser />}
            {deleteUser && <DeleteUser />}{" "}
            {logout ? (
              <div className="popup">
                <p>Are you sure you want to logout?</p>
                <button className="btn btn-danger w-25" onClick={logoutAction}>
                  Yes
                </button>
                <br />
                <button
                  className="btn btn-warning mt-3 w-25"
                  onClick={cancelLogout}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <UserManagement
                showUpdate={showUpdate}
                showView={showView}
                showDelete={showDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default home;
