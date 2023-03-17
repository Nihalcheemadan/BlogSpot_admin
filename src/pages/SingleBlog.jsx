import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import moment from "moment";

const SingleBlog = () => {
  const location = useLocation();
  const { params } = location.state.data;
  console.log(params,'blooooooooo')
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { userId } = jwtDecode(token);

  const [author, setAuthor] = useState("");
  const [user, setUser] = useState({});
  const [article, setArticle] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  //   const [blogId, setBlogId] = useState(blog._id);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(`/user/userDetails`, {
//         params: {
//           id: blog.author,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         setUser(res.data.user);
//         setArticle(res.data.article);
//       });
//   }, [blog]);

  return (
    <div>
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    // src={user.profileImg}
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {/* {user.username} */}
                    </a>

                    <p class="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {/* {moment(user.createdAt).format("MMMM Do YYYY")} */}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 class="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                {/* {blog.title} */}
              </h1>
            </header>

            <figure>
              {/* <img src={blog.imageUrl} alt="" className="h-96 w-full" /> */}
            </figure>

            {/* <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            /> */}
          </article>
        </div>
      </main>
    </div>
  );
};

export default SingleBlog;
