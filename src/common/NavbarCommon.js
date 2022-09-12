import {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './NavbarCommon.css';
import {getNavUser} from '../requests/userRequest';

const defaultAvatar = require("../assets/avatar.png");

function NavBarCommon(){
    const [username, setUsername] = useState("Usuario");
    const [avatar, setAvatar] = useState(null);

    // crear estilo:
    const index = {
        zIndex: "100"
    }

    useEffect(()=>{
        getNavUser(setUsername, setAvatar);
    }, []);


    return(
        <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="col-md-11 align-items-start ms-2" style={index} >
                        <NavLink to="/"className="navbar-brand">Task Learn</NavLink>
                    </div>
                    
                    <ul className="navbar-nav mb-2 mb-lg-0 align-items-end me-3">
                        <li className="nav-item align-items-end">
                            <NavLink to="/users" className="nav-link text-center">
                                {/* se modifican los campos para que reciban los hooks, en el caso de la imagen hay que validar: */}
                                <img className="avatar rounded img-thumbnail img-fluid" src={avatar ? `http://localhost:5000/api/users/avatar/${avatar}` : defaultAvatar} alt="foto"></img>
                                <div className="col">
                                    <small>{username}</small>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
        </Fragment>
    )
}

export default NavBarCommon;