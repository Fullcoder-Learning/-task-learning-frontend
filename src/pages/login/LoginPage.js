import {Fragment} from 'react';
import {useState} from 'react';
import './LoginPage.css';
import RegisterModalComponent from './RegisterModalComponent';
import ResetModalComponent from './ResetModalComponent';
import {loginRequest} from '../../requests/userRequest';
// importar componente alert:
import AlertCommon from '../../common/AlertCommon';

function LoginPage(){
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

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
        loginRequest(email, password, setAlertError, setAlertMessage);
    } 

    return(
        <Fragment>
            {/* cargar el componente de alerta: */}
        <AlertCommon alertSuccess={alertSuccess} alertError={alertError} alertMessage={alertMessage} />
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
            <RegisterModalComponent setAlertSuccess={setAlertSuccess} setAlertError={setAlertError} setAlertMessage={setAlertMessage} />
            {/* Enviar el estado de la alerta: */}
            <ResetModalComponent setAlertSuccess={setAlertSuccess} setAlertError={setAlertError} setAlertMessage={setAlertMessage} />
        </Fragment>
    )
}

export default LoginPage;