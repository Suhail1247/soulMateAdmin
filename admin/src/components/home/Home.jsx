import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import UserManagement from "./userManagement/UserManagement";
import { fetchAdminData } from "../../helper/helper";
import Update from "./Update";
import DeleteUser from "./DeleteUser";
import ViewUser from "./ViewUser";
import MenuListComposition from "./Dropdown";
function home() {
  const navigate = useNavigate();
  const [logout,setLogout]=useState()
  const [adminData,setAdminData]=useState()
  const [updateUser,setUpdateUser]=useState()
  const [viewUser,setViewUser]=useState()
  const [deleteUser,setDeleteUser]=useState()
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    else  if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1])); 
      const expirationTime = tokenData.exp * 1000; 

      if (Date.now() >= expirationTime) {
        console.log('Token expired. Removing token.');
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = await fetchAdminData();
        setAdminData(adminData);

      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, [logout]);

  const showAdministration=()=>{
    navigate('/administration')

  }
  const showUserManagement=()=>{

    navigate('/usermanagement')
  }
  const showNotification=()=>{

    navigate('/notification')

  }
  const showSubscription=()=>{

    navigate('/subscription')
  }
  const showLogout=()=>{

    setLogout(true)
  }
  const logoutAction=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  const cancelLogout = () => {
    setLogout(false);
  };

const showUpdate=()=>{
  setAllstateFalse()
  setUpdateUser(true)
}
const showView=()=>{
  setAllstateFalse()
  setViewUser(true)
}
const showDelete=()=>{
  setAllstateFalse()
  setDeleteUser(true)
}
const showDashboard=()=>{
  setLogout(false)
  navigate('/dashboard')
}

  return (
    <>
      <div className="container-fluid " style={{ height: "100vh",backgroundColor:'#36454F',overflow:'hidden' }}>
        <div className=" row  ">
        <div className="col-2  ps-5 pt-2">
      <img src="src\assets\logo.png" alt="" style={{ width: '5vw' }} />
    </div>
    <div className="col-10 d-flex justify-content-end">
 <span className="ms-3 me-3 text-light"> 
 <MenuListComposition/>
 </span>
    </div>
        <div
  className="col-2 p-4 text-white"
>


  <motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2  link" onClick={showDashboard}>
  Admin dashboard
</motion.p>
             
        
  <motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 mt-4 link" onClick={showAdministration}>
  Administration
</motion.p>

<motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 link" onClick={showUserManagement}>
  User management
</motion.p>

<motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 link"  onClick={showNotification}>
  Push notification
</motion.p>

<motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 link"  onClick={showSubscription}>
  Subscription
</motion.p>


</div>

<div className="col-10 " style={{backgroundColor:'#D3D3D3',height:'90vh'}}>

  {updateUser&&
<Update/>
}
{viewUser&&
<ViewUser/>
}
{deleteUser&&
<DeleteUser/>
} {logout?
    <div className="popup">
    <p>Are you sure you want to logout?</p>
    <button className="btn btn-danger w-25" onClick={logoutAction}>OK</button><br/>
    <button className="btn btn-warning mt-3 w-25"  onClick={cancelLogout}>Cancel</button>
  </div>
   :
 
    <UserManagement showUpdate={showUpdate} showView={showView} showDelete={showDelete}/>
  
}
  




</div>
        </div>
  
      </div>
    </>
  );
}

export default home;
