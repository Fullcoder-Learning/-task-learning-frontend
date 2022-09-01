import {Fragment} from 'react';
//  importar elementos de react router:
import {NavLink} from 'react-router-dom';
import './NavbarCommon.css';

const avatar = require("../assets/avatar.png");

function NavBarCommon(){

    return(
        <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <NavLink to="/" className="navbar-brand">Task Learn</NavLink>
                    </div>
                    
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/users" className="nav-link text-center">
                                <img className="avatar rounded img-thumbnail img-fluid" src={avatar} alt="foto"></img>
                                <small>Usuario</small>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
        </Fragment>
    )
}

export default NavBarCommon;