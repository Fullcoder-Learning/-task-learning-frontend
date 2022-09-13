import {Fragment, useState, useEffect} from 'react';
import {getUser, updateUser} from '../../requests/userRequest';

// importar componente modal:
import DeleteUserModalComponent from './DeleteUserModalComponent';

import './UserFormComponent.css';
// importar el componente alert:
import AlertCommon from '../../common/AlertCommon';

const defaultAvatar = require('../../assets/avatar.png');



function UserFormComponent(){
    // hook para datos del formulario:
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        file: null
    });
    const [avatar, setAvatar] = useState(null);
    const [id, setId] = useState("");
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");


    useEffect(()=>{
        getUser(setForm, setId, setAvatar);
    },[]);

    // creamos un manejador para los datos del formulario:
    const handleData = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const handleFile = (e) => {
        let file = {file: e.target.files[0]};
        setForm({...form, ...file})
    }

    const handleForm = (e) =>{
        e.preventDefault();
        console.log(form);
        updateUser(id, form, setAvatar, setAlertSuccess, setAlertMessage);
    }
    
    return(
        <Fragment>
            <AlertCommon alertSuccess={alertSuccess} alertMessage={alertMessage} />
            <div className="container mt-4 text-center">
                <form onSubmit={handleForm} encType="multipart/form-data">
                    <div className="row">
                        <div className="col">
                            <h3>Datos de usuario</h3>
                            <hr />
                            <img src={avatar ? `http://localhost:5000/api/users/avatar/${avatar}` : defaultAvatar} className="avatarEdit rounded img-thumbnail img-fluid"  alt="Avatar" />
                            <input type="file" className="form-control mt-3" placeholder="Subir avatar" name="file" filename={form.file} onChange={handleFile} />
                            <input type="text" className="form-control mt-3" placeholder="Nombre" name="name" value={form.name} onChange={handleData} />   
                            <input type="text" className="form-control mt-3" placeholder="Apellidos" name="lastname" value={form.lastname} onChange={handleData} />  
                            <input type="email" className="form-control mt-3" placeholder="Email" name="email" value={form.email} onChange={handleData} />  
                            <input type="password" className="form-control mt-3" placeholder="nueva contraseña (dejar en blanco para no cambiar)" name="password" onChange={handleData} /> 
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
        </Fragment>
    );
}

export default UserFormComponent;