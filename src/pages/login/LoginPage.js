import {Fragment} from 'react';
import {useState} from 'react';
import './LoginPage.css';
import RegisterModalComponent from './RegisterModalComponent';
import ResetModalComponent from './ResetModalComponent';
// importar modulo login:
import {loginRequest} from '../../requests/userRequest';

function LoginPage(){
    const [alert, setAlert] = useState(false);
    const [resetAlert, setResetAlert] = useState(false);
    // añadir todo lo relacionado con email y password y el form:
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    // crear handle para formulario:
    const handleForm = (e) =>{
        e.preventDefault();
        loginRequest(email, password);
    } 

    return(
        <Fragment>
            <div className={alert === true ? "alert alert-success" : "alert alert-success fade"} role="alert">
                Registro realizado con éxito. Ya puedes iniciar sesión.
            </div>
            <div className={resetAlert === true ? "alert alert-primary" : "alert alert-success fade"} role="alert">
                Se ha enviado un email para restablecer contraseña, por favor revisa tu bandeja de entrada.
            </div>
            <div className="bodystyle text-center" cz-shortcut-listen="true">
                <div className="form-signin text-center">
                    {/* añadir el handle: */}
                    <form onSubmit={handleForm}>
                        <h1>Por favor inicia sesión</h1>
                        <div className="form-floating">
                            {/* añadir el handle: */}
                            <input type="email" className="form-control" placeholder="name@example.com" onChange={handleEmail} />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
                            {/* añadir el handle: */}
                            <input type="password" className="form-control" placeholder="Contraseña" onChange={handlePassword} />
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                        <div className="mb-3">
                        <button type="button" className="cursor" data-bs-toggle="modal" data-bs-target="#registerUser">Crear usuario</button>
                        </div>
                        <div className="mb-3">
                        <button type="button" className="cursor" data-bs-toggle="modal" data-bs-target="#resetPassword">¿has olvidado la contraseña?</button>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar sesión</button>
                    </form>
                </div>
            </div>
            <RegisterModalComponent setAlert={setAlert} />
            <ResetModalComponent setAlert={setResetAlert} />
        </Fragment>
    )
}

export default LoginPage;