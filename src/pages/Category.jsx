import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Category = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const [showModal, setShowModal] = React.useState(false);

  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const cloudAPI = "dudskpuk4";
  const uploadProfile = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blogapp ");
    console.log(formData);
    let imageUrl = null;
    await axios
      .post( 
        `https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`,
        formData
      )
      .then(async (response) => {
        console.log(response.data.secure_url);
        const imageUrl = response.data.secure_url;
        console.log(imageUrl);
        const response1 = 
        
        await axios.post(
          "http://localhost:5000/api/admin/createCategory",
          { imageUrl: imageUrl,category:category } 
          
        ).then((res)=>{ 
          console.log(res);
          navigate('/categories')
        })
        if (response1.data.success) {
          toast.success(response1.data.message);
        }
      });
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <div className="pl-16 pt-9">
              <button
                className="h-12 w-32 bg-lime-500 "
                onClick={() => setShowModal(true)}
              >
                Add Category
              </button>
            </div>
            <div className="flex flex-wrap">
              <div className="pt-12 pl-16 ">
                <div className="max-w-sm rounded overflow-hidden shadow-sm inline-block ">
                  <img
                    className="w-full h-48 w-64"
                    src="https://thumbs.dreamstime.com/b/big-data-internet-information-technology-business-information-concept-big-data-internet-information-technology-business-112471615.jpg"
                    alt="Sunset in the mountains"
                  />
                  {/* <h6 className=" text-green text-center ">The Coldest Sunset</h6> */}
                  <div className="">
                    <div className="font-bold text-lg mb-2 text-slate-300">
                      Technology
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-12 pl-16">
                <div className="max-w-sm rounded overflow-hidden shadow-sm inline-block ">
                  <img
                    className="w-full h-48 w-64"
                    src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
                    alt="Sunset in the mountains"
                  />
                  {/* <h6 className=" text-green text-center ">The Coldest Sunset</h6> */}
                  <div className="">
                    <div className="font-bold text-lg mb-2 text-slate-300">
                      Travel
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-12 pl-16 w-96">
                <div className="max-w-sm rounded overflow-hidden shadow-sm inline-block ">
                  <img
                    className="w-full h-48 w-64"
                    src="https://thumbs.dreamstime.com/b/wooden-table-food-top-view-cafe-102532611.jpg"
                    alt="Sunset in the mountains"
                  />
                  {/* <h6 className=" text-green text-center ">The Coldest Sunset</h6> */}
                  <div className="">
                    <div className="font-bold text-lg mb-2 text-slate-300">
                      Food
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-12 pl-16 w-96">
                <div className="max-w-sm rounded overflow-hidden shadow-sm inline-block ">
                  <img
                    className="w-full h-48 w-64"
                    src="https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ="
                    alt="Sunset in the mountains"
                  />
                  {/* <h6 className=" text-green text-center ">The Coldest Sunset</h6> */}
                  <div className="">
                    <div className="font-bold text-lg mb-2 text-slate-300">
                      Books
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-xl font-semibold text-gray-500">
                        Add New Category
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div>
                      <div class="md:grid md:grid-cols-1 md:gap-6">
                        <div class="md:col-span-1"></div>
                        <div class="mt-5 md:mt-0 md:col-span-2">
                          <form onClick={uploadProfile}>
                            <div class="">
                              <div class="px-4 py-5 bg-white space-y-1 sm:p-6">
                                <div>
                                  <label class="block text-sm font-medium text-gray-700">
                                    Category
                                  </label>
                                  <div class="mt-1 flex items-center">
                                    <input
                                      type="text"
                                      onChange={(e)=>{
                                        setCategory(e.target.value)
                                      }}
                                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label class="block text-sm font-medium text-gray-700">
                                    Category Image
                                  </label>
                                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div class="space-y-1 text-center">
                                      <svg
                                        class="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="True"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                      <div class="flex text-sm text-gray-600">
                                        <label
                                          for="file-upload"
                                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload a file</span>
                                          <input
                                            onChange={(e) => {
                                              setImage(e.target.files[0]);
                                            }}
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            class="sr-only" 
                                          />
                                        </label>    
                                        <p class="pl-1">or drag and drop</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                  <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                  >
                                    ADD
                                  </button> 
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Category;
