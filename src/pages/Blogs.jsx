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
  Search,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { contextMenuItems } from "../data/dummy";
import { useNavigate } from "react-router-dom";
import instance from "../utils/baseUrl";
import { useDispatch } from "react-redux";
import { setSingleBlog } from "../redux/blogSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Blogs = () => {
  const dispatch = useDispatch();

  const [blog, setBlog] = useState([]);
  const [change, setChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blockedModal, setBlockedModal] = useState(false);

  const [reported, setReported] = useState([]);

  const [blogId, setBlogId] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("admintoken");

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("admintoken");

      const response = await instance.get("/admin/getBlog", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setBlog(response.data.blog);
    }
    fetchData();
  }, [change]);

  const blockBlog = async (id) => {
    await instance.patch(`/blog/blockBlog?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => setChange((prevState) => !prevState), 1000);
  };

  const publishBlog = async (id) => {
    await instance.patch(`/blog/unblockBlog?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => setChange((prevState) => !prevState), 1000);
  };

  const gridBlogstatus = async (params, id) => {
    if (params.status === "reported") {
      setBlogId(id);
      getBlogReportDetails(id);
      setShowModal((prev) => !prev);
    } else if (params.status === "blocked") {
      setBlogId(id);
      getBlogReportDetails(id);
      setBlockedModal((prev) => !prev);
    }
  };

  const getBlogReportDetails = async (id) => {
    console.log(id, "blogid herere");
    await instance
      .post(
        "/admin/reportManagement",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setReported(res?.data?.reportedUsers?.reported);
      });
  };
  console.log(reported, "response logged here");

  const headerGrid = [
    {
      field: "title",
      headerText: "BlogTitle",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "category",
      headerText: "Category",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "status",
      headerText: "Status",
      width: "150",
      textAlign: "Center",
    },
    {
      headerText: "Read",
      template: (params) => {
        return (
          <button
            style={{
              background: "#4CAF50",
            }}
            className="text-white  py-1 px-2 capitalize rounded-2xl text-md"
            onClick={() => {
              dispatch(setSingleBlog(params));
              if (params.status === "published") {
                navigate("/singleBlog");
              } else {
                navigate("/singleBlog");
              }
            }}
          >
            Read
          </button>
        );
      },
      field: "Action",
      textAlign: "Center",
      width: "120",
    },

    {
      headerText: "Action",
      template: (params) => {
        return (
          <button
            style={{
              background:
                params.status === "published"
                  ? "#4CAF50"
                  : params.status === "blocked"
                  ? "#2196F3"
                  : "#FF0000",
            }}
            className="text-white py-1 px-2 capitalize rounded-2xl text-md"
            onClick={() => gridBlogstatus(params, params._id)}
          >
            {params.status === "reported"
              ? "Reported"
              : params.status === "published"
              ? "Published"
              : "Blocked"}
          </button>
        );
      },
      field: "Action",
      textAlign: "Center",
      width: "120",
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Blogs" />
      {showModal && (
        <div class="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 {{ showModal ? '' : 'hidden' }}">
          <div class="flex items-center justify-center h-full">
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
              <div class="flex justify-end">
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowModal(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <h2 class="text-xl font-semibold mb-4 text-center">
                Report Management
              </h2>
              <form>
                <div class="flex mb-4">
                  <div class="w-1/2 pr-2">
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="users"
                    >
                      User:
                    </label>
                    {reported &&
                      reported.map((item) => {
                        return <input type="text" value={item.user.username} />;
                      })}
                  </div>
                  <div class="w-1/2 pl-2">
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="reason"
                    >
                      Reason:
                    </label>
                    {reported &&
                      reported.map((item) => {
                        return (
                          <input
                            class="form-textarea block w-full mt-1"
                            id="reason"
                            name="reason"
                            value={item.reason}
                          ></input>
                        );
                      })}
                  </div>
                </div>
                <div class="flex justify-end">
                  <button
                    onClick={() => blockBlog(blogId)}
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {blockedModal && (
        <div class="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 {{ showModal ? '' : 'hidden' }}">
          <div class="flex items-center justify-center h-full">
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
              <div class="flex justify-end">
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setBlockedModal(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <h2 class="text-xl font-semibold mb-4 text-center">
                Report Management
              </h2>
              <form>
                <div class="flex mb-4">
                  <div class="w-1/2 pr-2">
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="users"
                    >
                      User:
                    </label>
                    {reported &&
                      reported.map((item) => {
                        return <input type="text" value={item.user.username} />;
                      })}
                  </div>
                  <div class="w-1/2 pl-2">
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="reason"
                    >
                      Reason:
                    </label>
                    {reported &&
                      reported.map((item) => {
                        return (
                          <input
                            class="form-textarea block w-full mt-1"
                            id="reason"
                            name="reason"
                            value={item.reason}
                          ></input>
                        );
                      })}
                  </div>
                </div>
                <div class="flex justify-end">
                  <button
                    onClick={() => publishBlog(blogId)}
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
            <ColumnDirective key={item._id} {...item} />
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
            Search,
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default Blogs;
