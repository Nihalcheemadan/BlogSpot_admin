import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const Dummy = () => {
  // const [file, setFile] = useState(null);
  // const [base64Image, setBase64Image] = useState(null);
  
  const uploadProfile = async () => {
    
    await axios
      .get('http://localhost:5000/api/admin/createCategory' ).then((res)=>{
        console.log(res);
      })
      
  };


  return (
    <div>
      <button type='button' onClick={()=>{
        uploadProfile()
      }}>
        hello
      </button>
    </div>
  )
}

export default Dummy
