import React from 'react'
import { NavLink } from 'react-router-dom'

const SwitchTabs = () => {

    const switchBarStyle = { width : "15 px", height : "80px" , background : "" };
    const switchButtonStyle = { height: "50px" , background : "" , width : "350px" , display : "flex" ,margin : "auto"};

    return (<>
        <div className='m-4' style={ switchBarStyle}>
            <nav style={ switchButtonStyle }>
                <NavLink 
                    className={({ isActive }) => (isActive ? "link-active" : "link")}
                    to="/resources"
                >
                    Resources
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? "link-active" : "link")}
                    to="/requests"
                >
                    Requests
                </NavLink>

                <NavLink
                    to="/users"
                    className={({ isActive }) => (isActive ? "link-active" : "link")}
                >
                    Users
                </NavLink>
            </nav>
        </div>
    </>)
}

export default SwitchTabs