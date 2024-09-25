import React from "react";
import { Link, useLocation } from "react-router-dom";
import './navbarButton.css';
import { IconContext } from "react-icons";

const NavbarButton=(props)=>{
    const location =useLocation();
    const isActive=location.pathname===props.to;
    const btnClass=isActive? "btn-container active":"btn-container";

    return <Link to={props.to}><div className={btnClass}>
        <IconContext.Provider value={{size:'24px',className:"btn-icon"}}>
        {props.icon}<p className="btn-title">{props.title}</p>
        </IconContext.Provider>
         </div></Link>
}

export default NavbarButton;