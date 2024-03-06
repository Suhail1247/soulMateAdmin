import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../../helper/helper";
import { CiViewList } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdClear } from "react-icons/md"; // Import clear icon
import DataTable from "react-data-table-component";

function UserManagement(props) {
  const [userData, setUserData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // State for search value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = await fetchUserData();
        setUserData(fetchedUserData);
        setDataSource(fetchedUserData); // Set dataSource as well
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const update = (row) => {
    props.showUpdate(row); // Pass row data to showUpdate function
  };

  const view = (row) => {
    props.showView(row); // Pass row data to showView function
  };

  const deleteUser = (row) => {
    props.showDelete(row); // Pass row data to showDelete function
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
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`, // Combine first and last name
      sortable: true,
    },
    {
      name: "Phone",
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
    setSearchValue(keyword); // Update search value state
    const filtered = dataSource.filter((row) => {
      const fullName = `${row.firstName} ${row.lastName}`.toLowerCase(); // Combine first and last name for filtering
      return fullName.includes(keyword);
    });
    setUserData(filtered);
  };

  const clearSearch = () => {
    setSearchValue(""); // Clear search value state
    setUserData(dataSource); // Reset data to original dataSource
  };

  return (
    <div>
      <div className="text" style={{ width: "300px", float: "right", marginTop: "30px", position: "relative" }}>
        <input
          type="text"
          className="form-control"
          name="search"
          id="search"
          placeholder="Search"
          value={searchValue}  
          onChange={handleFilter}
        />
        {searchValue && (  
          <MdClear
            onClick={clearSearch}
            style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
          />
        )}
      </div>
      <DataTable
        title="Users"
        columns={columns}
        data={userData}
        fixedHeader
        selectableRows
        pagination
        highlightOnHover
      />
    </div>
  );
}

export default UserManagement;
