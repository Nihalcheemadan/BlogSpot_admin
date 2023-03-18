import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useSelector } from "react-redux";
import instance from "../utils/baseUrl";

const SingleBlog = () => {

  const { singleBlog } = useSelector((state) => state.blog)
  
  const token = localStorage.getItem("admintoken");

  const [user, setUser] = useState({});
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    instance
      .get(`/user/userDetails`, {
        params: {
          id: singleBlog.author,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setArticle(res.data.article);
      });
  }, [singleBlog]);

  return (
    <div>
      <main class=" pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    src={user.profileImg}
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {user.username}
                    </a>

                    <p class="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {moment(singleBlog.createdAt).format("MMMM Do YYYY")}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 class="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                {singleBlog.title}
              </h1>
            </header>

            <figure>
              <img src={singleBlog.imageUrl} alt="" className="h-96 w-full" />
            </figure>

            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
            />
          </article>
        </div>
      </main>
    </div>
  );
};

export default SingleBlog;
