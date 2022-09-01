// importar fragment:
import {Fragment} from 'react';
import {useState} from 'react';

// recuperar campo estado del hook:
function ResetModalComponent({setAlert}){
    const [email, setEmail] = useState("");

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    // crear handle para formulario:
    const handleForm = (e) =>{
        e.preventDefault();
        console.log(email);
        // cargar alert durante 3 segundos:
        setAlert(true);
        window.setTimeout(()=>{
            setAlert(false);
          }, 3000);
    } 

    // crear modal:
    return(
        <Fragment>
            <div className="modal fade" id="resetPassword" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Resetear contraseña</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={handleForm}>
                        <div className="row">
                            <div className="col text-center">
                                <input type="email" className="form-control mt-3" placeholder="Email" onChange={handleEmail} />  
                                <input type="submit" className="btn btn-success form-control mt-3" value="Enviar email" data-bs-dismiss="modal" />
                                <small>Recibirás un email que te llevará donde resetear tu contraseña</small>
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

export default ResetModalComponent;