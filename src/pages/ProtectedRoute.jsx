import axios from "axios"
import { Navigate } from "react-router-dom"
import instance from "../utils/baseUrl"

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("admintoken")
    if(token){
      instance
        .get("/admin/authenticate",
        {headers : {
          Authorization: `Bearer ${token}`,
      }})
        .then((response) => {
          const admin = response.data.admin
          if(admin){
            localStorage.clear()
            window.location.reload()
            return <Navigate to = {"/login"} replace = {true}></Navigate>
          }else{
            return children
          }
        })
    }else{
        return <Navigate to = {"/login"} replace = {true}></Navigate>
    }
   return children
}

export default ProtectedRoute
