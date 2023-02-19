import React, { useEffect } from "react";
import {
  Inject,
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import axios from "axios";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getUsers"
      );
      setUsers(response.data);
    }
    fetchData();
  }, []);

  const handleBlock = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/userBlock/${props.username}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const gridUserStatus = () => (
    <button
      type="button"
      style={{ background: "#03C9D7" }}
      className="text-gray-500 py-1 px-2 capitalize rounded-2xl text-md"
    >
      {/* {props.Actions} */}
      Block
    </button>
  );
  const titleGrid = [
    {
      headerText: "Username",
      width: "150",
      field: "username",
      textAlign: "Center",
    },
    { field: "email", headerText: "Email", width: "170", textAlign: "Center" },
    {
      field: "status",
      headerText: "Status",
      width: "135",
      format: "yMd",
      textAlign: "Center",
    },
    {
      field: "Actions",
      headerText: "Actions",
      template: gridUserStatus,
      width: "120",
      textAlign: "Center",
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Users" />
      <GridComponent
        dataSource={users}
        width="auto"
        allowPaging={true}
        allowSorting={true}
        pageSettings={{
          pageSize: 10,
          totalRecordsCount: users.length,
          pageCount: 5,
        }}
        toolbar={["Search"]}
      >
        <ColumnsDirective>
          {titleGrid.map((item, index) => (
            <ColumnDirective key={item._id}  {...item} />
            
          ))}
        </ColumnsDirective>
        <Inject services={[Toolbar, Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Users;
