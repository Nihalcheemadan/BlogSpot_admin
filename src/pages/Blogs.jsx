import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Inject,
  Toolbar,
  Search
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings, Header } from "../components";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import axios from "axios";

const Blogs = () => {
  // const editing = { allowDeleting: true, allowEditing: true };

  const [blog, setBlog] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getBlog"
      );
      setBlog(response.data);
    }
    fetchData();
  }, []);

  const gridBlogstatus = () => (
    <button
      type="button"
      style={{ background: "#03C9D7" }}
      className="text-gray-500 py-1 px-2 capitalize rounded-2xl text-md"
    >
      {/* {props.Actions} */}
      Block
    </button>
  );

  const headerGrid = [
    
    {
      field: 'title',
      headerText: 'BlogTitle',
      width: '150',
      textAlign: 'Center',
    },
    { field: 'category',
      headerText: 'Category',
      width: '150',
      textAlign: 'Center',
    },
    {
      headerText: 'Action',
      template: gridBlogstatus,
      field: 'Action',
      textAlign: 'Center',
      width: '120',
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Blogs" />
      <GridComponent
        dataSource={blog}
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        width="auto"
        allowPaging={true}
        allowSorting={true}
        pageSettings={{
          pageSize: 10,
          totalRecordsCount: 20,
          pageCount: 5,
        }}
        toolbar={["Search"]}
      >
        <ColumnsDirective>
          {headerGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            PdfExport,
            Toolbar,
            Search
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default Blogs;
