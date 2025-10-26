import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ApiLibras from "../components/common/ApiLibras";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    
  return (
    <>
      <ApiLibras />
      <Navbar />
      <Outlet />
      <Footer />
      
    </>
  )
}
