import { NavLink } from 'react-router'
import { useState } from 'react'
import { 
  HiOutlineHome, 
  HiOutlineUser, 
  HiOutlineSearch, 
  HiOutlineNewspaper, 
  HiOutlineQuestionMarkCircle 
} from "react-icons/hi";

export default function NavMobile() {
  const [activeIndex, setActiveIndex] = useState(2);

  const navItems = [
    { icon: <HiOutlineSearch />, to: "/home" },
    { icon: <HiOutlineNewspaper />, to: "/artigos" },
    { icon: <HiOutlineHome />, to: "/" },
    { icon: <HiOutlineUser />, to: "/:tipo(paciente|psicologo)/perfil/:id" },
    { icon: <HiOutlineQuestionMarkCircle />, to: "/sobre-nos" },
  ];

  return (
    <nav className="nav-mobile">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={`nav-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          {item.icon}
          <span className="indicator"></span>
        </NavLink>
      ))}
    </nav>
  );
}
