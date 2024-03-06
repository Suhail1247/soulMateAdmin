import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../../helper/helper";
import { CiViewList } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { motion } from 'framer-motion';
function UserManagement(props) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = await fetchUserData();
        setUserData(fetchedUserData);
      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, []);

  const tableStyle = {
    width: "80%",
  };

  const columnStyle = {
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "10px",
    textAlign: "left",
  };

  const imageStyle = {
    width: "3vw",
    borderRadius: "100px",
  };

  const actionStyle = {
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "10px",
    paddingRight: "0px",
    textAlign: "center",
  };

  const getRowStyle = (index) => {
    return {
      backgroundColor: index % 2 === 0 ? "#B2BEB5" : "",
  
    };
  };

  const update = () => {
    props.showUpdate();
  };

  const view = () => {
    props.showView();
  };

  const deleteUser = () => {
    props.showDelete();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th className="ps-3 pt-5 pb-3">Users</th>
          </tr>
        </thead>
        <tbody style={{ borderTop: "solid black" }}>
          {userData.map((user, index) => (
            <motion.tr  whileHover={{ scale: 1.02}} key={index} style={getRowStyle(index)}>
              <td style={columnStyle}>
              {user.photoUpload[0] && (
                <img
                  style={imageStyle}
                  src={user.photoUpload[0]}
                  alt={`Photo of ${user.firstName}`}
                />
              )}
                <span className="ms-2">
                  {user.firstName} {user.lastName}
                </span>
              </td>
              <td style={columnStyle}>{user.number}</td>
              <td style={actionStyle}>
                <CiViewList
                
                  onClick={view}
                  style={{ cursor: "pointer", color: "blue", width: "20px" }}
                />
                <FaRegEdit
                className="ms-3"
                  onClick={update}
                  style={{ cursor: "pointer", color: "blue", width: "20px" }}
                />
                <RiDeleteBin2Fill
                  className="ms-3"
                  onClick={deleteUser}
                  style={{ cursor: "pointer", color: "red", width: "20px" }}
                />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;

// <td style={columnStyle}>
//               {user.photoUpload[0] && (
//                 <img
//                   style={imageStyle}
//                   src={user.photoUpload[0]}
//                   alt={`Photo of ${user.firstName}`}
//                 />
//               )}
