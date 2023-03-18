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
import instance from "../utils/baseUrl";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(false);
  const token = localStorage.getItem("admintoken");

 
 
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("admintoken");

      const response = await instance.get(
        "/admin/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      setUsers(response.data);
    }
    fetchData();
    console.log("change state updated:", change);

  }, [change]);

  const gridUserStatus = async(params, id) => {
    console.log(params.status, id, "paraamsssssssss");
    
    if(params.status === 'unblocked'){
      console.log('hello ');
      await instance.get(`/admin/userBlock?id=${params._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        setTimeout(() => setChange(prevState => !prevState), 1000);
    }else{
      await instance.get(`/admin/userUnblock?id=${params._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        setTimeout(() => setChange(prevState => !prevState), 1000);
    }
  };

  
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
      template: (params) => {
        return (
          <button style={{ background: "#03C9D7" }} className="text-gray-500 py-1 px-2 capitalize rounded-2xl text-md"
            onClick={() => gridUserStatus(params, params._id)}>
            {params.status === 'blocked' ? "Unblock" : "Block" }
          </button>
        );
      },
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
            <ColumnDirective
              key={index}
              field={item.field}
              headerText={item.headerText}
              width={item.width}
              format={item.format}
              textAlign={item.textAlign}
              template={item.template}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Toolbar, Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Users;
