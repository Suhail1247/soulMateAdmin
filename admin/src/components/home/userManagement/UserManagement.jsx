import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../../helper/helper";
import { CiViewList } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import DataTable from "react-data-table-component";

function UserManagement(props) {
  const [userData, setUserData] = useState([]);
  const [dataSource, setDataSource] = useState([]);

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

  const update = () => {
    props.showUpdate();
  };

  const view = () => {
    props.showView();
  };

  const deleteUser = () => {
    props.showDelete();
  };

  const columns = [
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.photoUpload[0]} // Assuming photoUpload is an array with photo URLs
          alt={`Photo of ${row.firstName}`}
          style={{ width: "37px", borderRadius: "50%" }}
        />
      ),
      sortable: false,
    },
    
    {
      name: " Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: " Phone",
      selector: (row) => row.number,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <CiViewList
            onClick={() => view(row)}
            style={{ cursor: "pointer", color: "blue", marginRight: "20px" }}
          />
          <FaRegEdit
            onClick={() => update(row)}
            style={{ cursor: "pointer", color: "blue", marginRight: "20px" }}
          />
          <RiDeleteBin2Fill
            onClick={() => deleteUser(row)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </div>
      ),
      sortable: false,
    },
  ];

  const handleFilter = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = dataSource.filter((row) => {
      const name = row.firstName ? row.firstName.toLowerCase() : "";  
      return name.includes(keyword);
    });
    setUserData(filtered);
  };

  return (
    <div>
      <div className="text" style={{ width: "300px", float: "right",marginTop:"30px" }}>
        <input
          type="text"
          className="form-control"
          name="search"
          id="search"
          placeholder="Search"
          onChange={handleFilter}
        />
      </div>
      <DataTable
        title="Users"
        columns={columns}
        data={userData} // Render the filtered data
        fixedHeader
        selectableRows
        pagination
        highlightOnHover
      />
    </div>
  );
}

export default UserManagement;
