import {Fragment} from 'react';
// importar el servicio:
import {deleteTask} from '../../requests/taskRequest';

// recuperar campo id del hook:
function DeleteTaskModalComponent({id, name, tasks, setTasks}){
    const taskId = id;
    const taskName = name;

    // crear un handle para el botón:
    const handleButton = (e)=> {
        console.log("TAREA:" + taskId);
        deleteTask(tasks, setTasks, taskId);
    }

    return(
        <Fragment>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Se va a eliminar la siguiente tarea</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Tarea: {taskName}</p>
                        <small>Codigo: {taskId}</small>
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

export default DeleteTaskModalComponent;