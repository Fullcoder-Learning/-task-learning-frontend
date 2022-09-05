import {useState, useEffect} from 'react';
import {getUser, updateUser} from '../../requests/userRequest';

// importar componente modal:
import DeleteUserModalComponent from './DeleteUserModalComponent';

import './UserFormComponent.css';
const defaultAvatar = require('../../assets/avatar.png');


function UserFormComponent(){
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [id, setId] = useState("");
    const [alert, setAlert] = useState(false);


    useEffect(()=>{
        getUser(setName, setLastname, setEmail, setId, setAvatar);
        
    },[]);

    const handleFile = (e) =>{
        setFile(e.target.files[0]);
    }

    const handleName = (e) =>{
        setName(e.target.value);
    }

    const handleLastname = (e) =>{
        setLastname(e.target.value);
    }

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleForm = (e) =>{
        e.preventDefault();
        updateUser(id, name, lastname, email, password, file, setAvatar, setAlert);
    }
    
    return(
        <div className="container mt-4 text-center">
            <div className={alert === true ? "alert alert-success" : "alert alert-success fade"} role="alert">
                Se han actualizado los datos.
            </div>
            <form onSubmit={handleForm} encType="multipart/form-data">
                <div className="row">
                    <div className="col">
                        <h3>Datos de usuario</h3>
                        <hr />
                        <img src={avatar ? `http://localhost:5000/api/users/avatar/${avatar}` : defaultAvatar} className="avatarEdit rounded img-thumbnail img-fluid"  alt="Avatar" />
                        <input type="file" className="form-control mt-3" placeholder="Subir avatar" filename={file} onChange={handleFile} />
                        <input type="text" className="form-control mt-3" placeholder="Nombre" value={name} onChange={handleName} />   
                        <input type="text" className="form-control mt-3" placeholder="Apellidos" value={lastname} onChange={handleLastname} />  
                        <input type="email" className="form-control mt-3" placeholder="Email" value={email} onChange={handleEmail} />  
                        <input type="password" className="form-control mt-3" placeholder="nueva contraseña (dejar en blanco para no cambiar)" onChange={handlePassword} /> 
                        <input type="submit" className="btn btn-success form-control mt-3" value="Actualizar datos" />
                    </div>
                </div>
            </form>
            {/* botón para dar de baja usuario: */}
            <div className="row">
                <div className="col">
                    <hr />
                    <button type="button" className="cursor me-2 mb-1" data-bs-toggle="modal" data-bs-target="#deleteUserModal">Dar de baja usuario</button>
                </div>
            </div>
            <DeleteUserModalComponent id={id} />
        </div>
    );
}

export default UserFormComponent;