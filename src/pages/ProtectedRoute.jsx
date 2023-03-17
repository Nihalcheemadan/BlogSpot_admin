import axios from "axios"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")
    if(token){
        axios
        .get("http://localhost:5000/admin/authenticate",
        {headers : {
          Authorization: `Bearer ${token}`,
      }})
        .then((response) => {
          const admin = response.data.admin
          if(!admin){
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
