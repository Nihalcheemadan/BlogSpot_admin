import { useFormik } from "formik";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const loginPromise = await axios.post(
          "http://localhost:5000/api/admin/login",
          values
        );
        setLoading(false);
        console.log(loginPromise);
        let { token } = loginPromise.data;
        localStorage.setItem("token", token);
        navigate("/", { replace: true });
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.error);
      }
    },
  })
  
  return (
    <div className="App bg-emerald-300 h-screen w-screen relative overflow-hidden flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
      <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
      <Tilt>
        <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
          <form
            className="h-full flex flex-col justify-evenly items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-white font-poppins text-2xl tracking-widest">
              SIGN IN
            </div>
            <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="Username"
              className="placeholder:text-gray-500 pl-[14px] input-text rounded h-9  bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80"
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            ) : null}
            <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="password"
              className="placeholder:text-gray-500 pl-[14px] input-text h-9  rounded bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80"
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
            <input
              type="Submit"
              className="cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 "
            />
          </form>
        </div>
      </Tilt>
    </div>
  );
}

export default Login;
