import React, { useEffect, useState } from "react";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import axios from "axios";




const Dashboard = () => {

  const [ blogs,setBlogs ] = useState();

  const data = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: '10',
      percentage: '',
      title: 'Active users',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: '8',
      percentage: '',
      title: 'Blogs',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
  ]

  useEffect(()=>{
    axios.get('http://localhost:5000/api/admin/dashboard').then((res)=>{
      console.log(res.data.blogs,'klklklkkl');
      setBlogs(res.data.blogs);
      setUsers(res.data.users);
    })
  })

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {data.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{
                  color: item.iconColor,
                  backgroundColor: item.iconBg,
                }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 

export default Dashboard;
