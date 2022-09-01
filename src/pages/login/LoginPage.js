import {Fragment} from 'react';
import {useState} from 'react';
import './LoginPage.css';
import RegisterModalComponent from './RegisterModalComponent';
// importar el modal reset:
import ResetModalComponent from './ResetModalComponent';

function LoginPage(){
    const [alert, setAlert] = useState(false);
    // crear hook para la alerta:
    const [resetAlert, setResetAlert] = useState(false);

    return(
        <Fragment>
            <div className={alert === true ? "alert alert-success" : "alert alert-success fade"} role="alert">
                Registro realizado con éxito. Ya puedes iniciar sesión.
            </div>
            {/* crear un alert con condición de ocultar en la clase: */}
            <div className={resetAlert === true ? "alert alert-primary" : "alert alert-success fade"} role="alert">
                Se ha enviado un email para restablecer contraseña, por favor revisa tu bandeja de entrada.
            </div>
            <div className="bodystyle text-center" cz-shortcut-listen="true">
                <div className="form-signin text-center">
                    <form>
                        <h1>Por favor inicia sesión</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
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
            {/* pasar estado de la alerta: */}
            <ResetModalComponent setAlert={setResetAlert} />
        </Fragment>
    )
}

export default LoginPage;