// importar hook:
import {useState} from 'react';

// cargar hoja de estilo:
import './UserFormComponent.css';
// importar avatar por defecto:
const avatar = require('../../assets/avatar.png');

function UserFormComponent(){
    // crear hooks:
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        console.log(file);
        console.log(name);
        console.log(lastname);
        console.log(email);
        console.log(password);
    }
    
    // cargar formulario:
    return(
        <div className="container mt-4 text-center">
            <form onSubmit={handleForm}>
                <div className="row">
                    <div className="col">
                        <h3>Datos de usuario</h3>
                        <hr />
                        <img src={avatar} className="avatarEdit rounded img-thumbnail img-fluid"  alt="Avatar" />
                        <input type="file" className="form-control mt-3" placeholder="Subir avatar" onChange={handleFile} />
                        <input type="text" className="form-control mt-3" placeholder="Nombre" onChange={handleName} />   
                        <input type="text" className="form-control mt-3" placeholder="Apellidos" onChange={handleLastname} />  
                        <input type="text" className="form-control mt-3" placeholder="Email" onChange={handleEmail} />  
                        <input type="text" className="form-control mt-3" placeholder="Contraseña" onChange={handlePassword} /> 
                        <input type="submit" className="btn btn-success form-control mt-3" value="Actualizar datos" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserFormComponent;