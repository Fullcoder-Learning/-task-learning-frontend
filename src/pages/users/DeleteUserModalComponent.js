import {Fragment} from 'react';
// importar el servicio:
import {deleteUserRequest} from '../../requests/userRequest';

// recuperar campo id del hook:
function DeleteUserModalComponent({id}){
    const userId = id;

    // crear un handle para el botón:
    const handleButton = (e)=> {
        deleteUserRequest(userId);
    }

    return(
        <Fragment>
            <div className="modal fade" id="deleteUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Cerrar cuenta</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Se va a eliminar su cuenta de usuario junto a todas sus tareas</p>
                        <p>Esta operación no tiene retorno, ¿proceder?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        {/* Cargar el handle en el botón: */}
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleButton}>Aceptar</button>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeleteUserModalComponent;