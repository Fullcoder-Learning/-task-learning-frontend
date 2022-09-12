import {Fragment} from 'react';
import {useState} from 'react';
import './LoginPage.css';
import RegisterModalComponent from './RegisterModalComponent';
import ResetModalComponent from './ResetModalComponent';
import {loginRequest} from '../../requests/userRequest';
// importar componente alert:
import {AlertCommon} from '../../common/AlertCommon'

function LoginPage(){
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    //const [alertError, setAlertError] = useState(false);
    // cargar los hooks para las alertas:
    const [resetAlert, setResetAlert] = useState(false);
    const [resetAlertError, setResetAlertError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleForm = (e) =>{
        e.preventDefault();
        loginRequest(email, password, setAlertError);
    } 

    return(
        <Fragment>
            <AlertCommon alertSuccess={alertSuccess} alertError={alertError} alertMessage={alertMessage} />
            <div className={alert === true ? "alert alert-success" : "alert alert-success fade"} role="alert">
                Registro realizado con éxito. Ya puedes iniciar sesión.
            </div>
            <div className={alertErrorRegister === true ? "alert alert-warning" : "alert alert-success fade"} role="alert">
                Error al crear usuario, el email ya existe.
            </div>
            <div className={alertError === true ? "alert alert-danger" : "alert alert-danger fade"} role="alert">
                Error al iniciar sesión, usuario o contraseña incorrectos.
            </div>
            <div className={resetAlert === true ? "alert alert-danger" : "alert alert-danger fade"} role="alert">
                Se ha enviado un email para restablecer contraseña, por favor revisa tu bandeja de entrada.
            </div>
            {/* Añadir la alerta si no se reestablece la contraseña: */}
            <div className={resetAlertError === true ? "alert alert-danger" : "alert alert-danger fade"} role="alert">
                Error, el email introducido no existe.
            </div>
            <div className="bodystyle text-center" cz-shortcut-listen="true">
                <div className="form-signin text-center">
                    <form onSubmit={handleForm}>
                        <h1>Por favor inicia sesión</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control" placeholder="name@example.com" onChange={handleEmail} />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
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
            <RegisterModalComponent setAlert={setAlert} setAlertErrorRegister={setAlertErrorRegister} />
            {/* Enviar el estado de la alerta: */}
            <ResetModalComponent setAlert={setResetAlert} setResetAlertError={setResetAlertError} />
        </Fragment>
    )
}

export default LoginPage;