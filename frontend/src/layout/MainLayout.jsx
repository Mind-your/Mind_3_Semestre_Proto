import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { Outlet } from "react-router"

export default function MainLayout() {
    
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
