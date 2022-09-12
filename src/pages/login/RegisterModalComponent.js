// importar fragment:
import {Fragment} from 'react';
import {useState} from 'react';
// importar modulo registro:
import {registerRequest} from '../../requests/userRequest';

function RegisterModalComponent({setAlertSuccess, setAlertError, setAlertMessage}){
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
        registerRequest(email, password, setAlertSuccess, setAlertError, setAlertMessage);
    } 

    // crear modal:
    return(
        <Fragment>
            <div className="modal fade" id="registerUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Registro</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={handleForm}>
                        <div className="row">
                            <div className="col">
                                <input type="email" className="form-control mt-3" placeholder="Email" minLength="5" onChange={handleEmail} />  
                                <input type="password" className="form-control mt-3" placeholder="Contraseña" minLength="1" onChange={handlePassword} /> 
                                <input type="submit" className="btn btn-success form-control mt-3" value="Darse de alta" data-bs-dismiss="modal" />
                            </div>
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RegisterModalComponent;