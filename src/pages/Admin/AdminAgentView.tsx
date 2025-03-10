import React, {useEffect} from 'react'
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Table from '../../components/common/Table';
import SideBar from '../../components/layout/Admin/SideBar';
const AdminAgentView : React.FC = () => {
  useEffect(() =>{
          //const data = 
  });
  return (
    <>
       <Navbar />
       <div className=' flex min-h-full'>
         <SideBar />
         <Table />
       </div>
       <Footer />
    </>
  )
}

export default AdminAgentView
