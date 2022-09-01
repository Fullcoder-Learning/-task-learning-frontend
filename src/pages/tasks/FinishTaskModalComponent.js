// importar fragment:
import {Fragment} from 'react';

// recuperar campo id del hook:
function FinishTaskModalComponent({id, name}){
    const taskId = id;
    const taskName = name;

    // crear modal:
    return(
        <Fragment>
            <div className="modal fade" id="finishModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Se va a finalizar la siguiente tarea</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{taskId} - {taskName}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default FinishTaskModalComponent;