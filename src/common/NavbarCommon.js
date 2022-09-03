import {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
// importar los hooks usestate y useeffect:
import {useState, useEffect} from 'react';
import './NavbarCommon.css';
// importar servicio user:
import {getNavUser} from '../requests/userRequest';

const defaultAvatar = require("../assets/avatar.png");

function NavBarCommon(){
    // crear dos hooks con el nombre de usuario y la foto:
    const [username, setUsername] = useState("Usuario");
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        // le pasamos al los hooks el valor:
        getNavUser(setUsername, setAvatar);
    }, []);


    return(
        <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <NavLink to="/" className="navbar-brand">Task Learn</NavLink>
                    </div>
                    
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/users" className="nav-link text-center">
                                {/* se modifican los campos para que reciban los hooks, en el caso de la imagen hay que validar: */}
                                <img className="avatar rounded img-thumbnail img-fluid" src={avatar ? `http://localhost:5000/api/users/avatar/${avatar}` : defaultAvatar} alt="foto"></img>
                                <small>{username}</small>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
        </Fragment>
    )
}

export default NavBarCommon;