import {Fragment} from 'react';
import {useState} from 'react';
import './ResetPasswordPage.css';
// importar useParams de React Router:
import { useParams } from 'react-router-dom';
// importar servicio reset password:
import {resetRequest} from '../../requests/userRequest';

function ResetPasswordPage(){
    // crear dos hooks para la contraseña:
    const [newPassword, setNewPassword] = useState("");
    const [repiteNewPassword, setRepiteNewPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [match, setMatch] = useState(true);

    // recuperar parametros de ruta:
    const {id, token} = useParams();

    // crear handles:
    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleRepiteNewPassword = (e) => {
        setRepiteNewPassword(e.target.value);
    }

    const handleForm = (e) => {
        e.preventDefault();
        console.log(newPassword);
        console.log(repiteNewPassword);
        console.log(id);
        console.log(token);
        // comprobar que las contraseñas coinciden:
        if(newPassword !== repiteNewPassword){
            console.log("No coinciden las claves");
            setMatch(false);
        }else{
            setMatch(true);
            // enviar nueva contraseña:
            resetRequest(newPassword, repiteNewPassword, id, token, setAlert)
            
        }
        
    }

    return(
        <Fragment>
            {/* crear un alert con condición de ocultar en la clase: */}
            <div className={alert === true ? "alert alert-success" : "alert alert-success fade"} role="alert">
                Contraseña restablecida con éxito. Ya puedes iniciar sesión.
            </div>
            <div className="bodystyle text-center" cz-shortcut-listen="true">
                <div className="form-signin text-center">
                    <form onSubmit={handleForm}>
                        <h1>Restablecer contraseña</h1>
                        <div className="form-floating">
                            <input type="password" className="form-control" placeholder="Password" onChange={(handleNewPassword)} />
                            <label htmlFor="floatingPassword">Nueva contraseña</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" placeholder="Password"  onChange={handleRepiteNewPassword}  />
                            <label htmlFor="floatingPassword">Repetir nueva contraseña</label>
                            <small className={match === false ? "text-danger" : "text-danger invisible"}>Las contraseñas no coinciden</small>
                        </div>
                        <button className="w-100 btn btn-lg btn-secondary" type="submit">Cambiar contraseña</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPasswordPage;