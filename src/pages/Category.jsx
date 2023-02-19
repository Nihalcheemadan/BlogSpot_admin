import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast  } from "react-hot-toast";


const Category = () => {
  const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [showcategory, setShowcategory] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getCategory"
      );
      setShowcategory(response.data);
    }
    fetchData();
  }, []);

  const cloudAPI = "dudskpuk4";
  const uploadProfile = async () => {
    try {
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
          const response1 = await axios
            .post("http://localhost:5000/api/admin/createCategory", {
              imageUrl: imageUrl,
              category: category,
            })
            .then(() => {
              setShowModal(false);
            });
          navigate("/categories");
        });
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };

  return (
    <>

      <div className="pl-16 pt-9">
        <button
          className="h-12 w-32 bg-lime-500 "
          onClick={() => setShowModal(true)}
        >
          Add Category
        </button>
      </div>
      <div className="flex flex-wrap">

        {showcategory &&
          showcategory.map((data) => (
            <div className="pt-12 pl-16 " key={data._id}>
              <div className="max-w-sm rounded overflow-hidden shadow-sm inline-block ">
                <img
                  className="w-full h-48 w-64"
                  src={data.imageUrl}
                  alt="Sunset in the mountains"
                />
                {/* <h6 className=" text-green text-center ">The Coldest Sunset</h6> */}
                <div className="">
                  <div className="font-bold text-lg mb-2 text-slate-300">
                    {data.category}
                    {console.log(data.category)}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                                  onChange={(e) => {
                                    setCategory(e.target.value);
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
    </>
  );
};

export default Category;
