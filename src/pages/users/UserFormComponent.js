// importar useEffect:
import {useState, useEffect} from 'react';
// importar el servicio:
import {getUser, updateUser} from '../../requests/userRequest';

import './UserFormComponent.css';
// cargar avatar por defecto si no hemos subido uno:
const defaultAvatar = require('../../assets/avatar.png');

function UserFormComponent(){
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // este hook gestionará el input file del avatar:
    const [file, setFile] = useState(null);
    // este hook cargará la imagen que tengamos disponible, sino abajo validamos que muestre el avatar por defecto:
    const [avatar, setAvatar] = useState(null);
    const [id, setId] = useState("");

    useEffect(()=>{
        // enviar estados para actualizar campos:
        getUser(setName, setLastname, setEmail, setId, setAvatar);
        // console.log(id);
        
    },[]);

    // crear handles para cambiar estado de hooks:
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

    // crear handle para formulario:
    const handleForm = (e) =>{
        e.preventDefault();
        updateUser(id, name, lastname, email, password, file, setAvatar);
    }
    
    // cargar formulario:
    return(
        <div className="container mt-4 text-center">
            <form onSubmit={handleForm} encType="multipart/form-data">
                <div className="row">
                    <div className="col">
                        <h3>Datos de usuario</h3>
                        <hr />
                        {/* Cargar values y filename en caso de input form (validar el avatar que se muestra si existe, sino mostrar uno por defecto): */}
                        <img src={avatar ? `http://localhost:5000/api/users/avatar/${avatar}` : defaultAvatar} className="avatarEdit rounded img-thumbnail img-fluid"  alt="Avatar" />
                        <input type="file" className="form-control mt-3" placeholder="Subir avatar" filename={file} onChange={handleFile} />
                        <input type="text" className="form-control mt-3" placeholder="Nombre" value={name} onChange={handleName} />   
                        <input type="text" className="form-control mt-3" placeholder="Apellidos" value={lastname} onChange={handleLastname} />  
                        <input type="email" className="form-control mt-3" placeholder="Email" value={email} onChange={handleEmail} />  
                        <input type="password" className="form-control mt-3" placeholder="Contraseña" onChange={handlePassword} /> 
                        <input type="submit" className="btn btn-success form-control mt-3" value="Actualizar datos" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserFormComponent;