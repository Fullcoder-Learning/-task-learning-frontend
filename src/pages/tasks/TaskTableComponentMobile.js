import moment from 'moment';

function TaskTableComponent({tasks, showTask, inputUpdate, dataHandle, 
    hideInput, taskData, updateTaskHandle, cancelHandle, handleForm, getTaskData, editHandleButton}){

    return(
        <div>
           <div className="list-group ms-1 me-1 mt-3">
            { tasks ? (
                tasks.map(data => {
                    return(
                        <div key={data._id} style={showTask ? null : inputUpdate} className="list-group-item list-group-item-action" aria-current="true" onClick={
                            getTaskData(data._id, data.name, data.description, data.date_created, data.is_complete, data.date_finish)}>
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{data.name}</h5>
                            <small>{moment(data.date_created).format('D/M/YYYY, h:mm:ss a')}</small>
                            </div>
                            <p className="mb-1">{data.description}</p>
                            <small>{data.is_complete ? (`Finalizada el: ${moment(data.date_finish).format('D/M/YYYY, h:mm:ss a')}`) : ('En curso')}</small>
                        </div>
                    )
                })
                ) : (<span className="text-center mt-4">No existen tareas</span>)
            }
                <div style={hideInput ? inputUpdate : null} className="list-group-item list-group-item-action" aria-current="true" onClick={
                    getTaskData(taskData.id, taskData.name, taskData.description, taskData.date_created, taskData.is_complete, taskData.date_finish)}>
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1"><input name="name" className="col me-2 form-control form-sm" type="text" placeholder="Título" value={taskData.name} onChange={dataHandle} /></h5>
                    <small>{moment(taskData.date_created).format('D/M/YYYY, h:mm:ss a')}</small>
                    </div>
                    <p className="mb-1"><input name="description" className="col me-2 form-control" type="text" placeholder="Descripción" value={taskData.description} onChange={dataHandle} /></p>
                    <small>{taskData.is_complete ? (`Finalizada el: ${moment(taskData.date_finish).format('D/M/YYYY, h:mm:ss a')}`) : ('En curso')}</small>
                </div>
                <div style={showTask ? null : inputUpdate} className="list-group-item list-group-item-action" aria-current="true" >
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1"><input name="name" className="col me-2 form-control form-sm" type="text" placeholder="Título" value={taskData.name} onChange={dataHandle} /></h5>
                    <small>NUEVA TAREA</small>
                    </div>
                    <p className="mb-1"><input name="description" className="col me-2 form-control" type="text" placeholder="Descripción" value={taskData.description} onChange={dataHandle} /></p>
                    <small><button type="button" className="btn btn-success" onClick={handleForm}>crear tarea</button></small>
                </div>
            </div>
            {/* truco para separar: */}
            <br /><br /><br /><br />
            <nav className="navbar fixed-bottom navbar-dark bg-dark" >
                <div className="container-fluid text-center">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" style={showTask ? null : inputUpdate} className="btn btn-warning" onClick={editHandleButton}>Editar</button>
                        <button type="button" style={showTask ? null : inputUpdate} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#finishModal">Finalizar</button>
                        <button type="button" style={showTask ? null : inputUpdate} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Eliminar</button>
                        {/* Mostrar otra hilera de botones para editar: */}
                        <button type="button" style={hideInput ? inputUpdate : null} className="btn btn-success" onClick={updateTaskHandle} >Guardar cambios</button>
                        <button type="button" style={hideInput ? inputUpdate : null} className="btn btn-secondary" onClick={cancelHandle} >Cerrar</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default TaskTableComponent;