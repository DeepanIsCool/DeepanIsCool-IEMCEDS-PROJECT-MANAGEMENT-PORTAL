import React, { useEffect, useState } from 'react'
import useFormatData from '../../hooks/useFormatDate'
import { useNavigate } from 'react-router-dom'
import AdminDashboard1 from '../../pages/AdminDashboard1'
const StudentApplication = ({title,description,date,studentId,applicationId}) => {
  const formattedDate=useFormatData(date)
  const [popUp, setPopUp] = useState(false)
  const navigate=useNavigate()
 

  return (
    <div className='w-full flex items-center justify-center'>
          <div>
            {popUp && 
            <div className='w-full h-[100vh]'>
              <AdminDashboard1 setPopUp={setPopUp} show={popUp} studentId={studentId} title={description}
              applicationId={applicationId}
              />
            </div>
            }         
            </div>
    <div className=" rounded-xl  bg-white  px-5 py-5 flex items-start gap-4 w-[90%] mb-5">

              <div className='flex w-1/4 gap-11 items-center h-10 bg-white'>
          <p className='text-xl'>{title}</p>            
              </div>
          <div className='flex w-[50%] gap-11 items-center justify-center h-10 text-xl bg-white'>
            {description}
            </div>         
          <div className='flex w-[10%] gap-11 items-center justify-center h-10 text-xl bg-white'>
          {formattedDate}
            </div>         
          <button className='flex w-[10%] gap-11 items-center justify-center h-10 text-xl cursor-pointer bg-blue-500 text-white rounded-md' onClick={()=>setPopUp(true)}>
          View
            </button>
            
    </div>
    </div>

          
  )
}

export default StudentApplication