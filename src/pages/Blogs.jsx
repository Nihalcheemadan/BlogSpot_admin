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
import {  useNavigate } from "react-router-dom";

const Blogs = () => {

  const [blog, setBlog] = useState([]);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getBlog"
      );
      setBlog(response.data.blog);
    }
    fetchData();
  }, [change]);

  const gridBlogstatus = async (params,id) => {
    if(params.status === 'reported'){
      await axios.patch(`http://localhost:5000/api/blog/blockBlog?id=${params._id}`)
        setTimeout(() => setChange(prevState => !prevState), 1000);
    }else if(params.status === 'published'){
      // <link  href="http://localhost:3000/" />
      window.location.href = 'http://localhost:3000/'
    }
    else{
      await axios.patch(`http://localhost:5000/api/blog/unblockBlog?id=${params._id}`)
        setTimeout(() => setChange(prevState => !prevState), 1000);
    }
  }

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
    { field: 'status',
      headerText: 'Status',
      width: '150',
      textAlign: 'Center',
    },
    {
      headerText: 'Action',
      
      template: (params) => {
        return (
          <button style={{ 
            background: params.status === 'published' ? "#4CAF50" : 
              params.status === 'blocked' ? "#2196F3" :
              "#FF0000", 
          }} className="text-gray-500 py-1 px-2 capitalize rounded-2xl text-md"
            onClick={() => gridBlogstatus(params, params._id)}>
            {params.status === 'reported' ? "Remove" : (params.status === 'published' ? "Read" : "Publish")}
          </button>
        )
      },
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
            <ColumnDirective key={item._id} {...item}  />
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
