import React, { useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { employeesData } from "../data/dummy";
import axios from "axios";
import { useState } from "react";

const Users = () => {

  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  
  const [ users,setUsers ] = useState([])
  useEffect(() => { 
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/api/admin/getUsers");
      setUsers(response.data);
    }
    fetchData();  
  }, []); 

  let names = users.map(function(obj) {
    return obj.username;
  });
  console.log(names);

  // const gridUserStatus = () => (
  //   <button
  //     type="button"
  //     style={{ background: "#03C9D7" }}
  //     className="text-gray-500 py-1 px-2 capitalize rounded-2xl text-md"
  //   >
  //     {/* {props.Actions} */}
  //     Block
  //   </button>
  // );

  const employeesGrid = [
    { headerText: 'Username',
      width: '150',
      field: 'Username',
      textAlign: 'Center' },
    
    { field: 'Job',
      headerText: 'Job',
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'Place',
      field: 'Country',
      width: '120',
      textAlign: 'Center',
      // template: gridEmployeeCountry
    },
    { field: 'Status',
      headerText: 'Status', 
      width: '135',
      format: 'yMd',
      textAlign: 'Center' },
    { field: 'Actions',
      headerText: 'Actions',
      // template: gridUserStatus,
      width: '120',
      textAlign: 'Center' },
    ];

    const employeesData = [
      {
        
        Username: {names},
        Job: 'Sales Representative',
        HireDate: '01/02/2021',
        Country: 'Kerala',
        ReportsTo: 'Carson',
        
        Status:'Active',
        Actions:'Block', 
        StatusBg: '#03C9D7',
      },
      ]
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Users" />
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Users;
