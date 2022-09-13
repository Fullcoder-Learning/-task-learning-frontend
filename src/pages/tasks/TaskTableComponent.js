import moment from 'moment';

// pasarle nuevos elementos que antes estaban aquí:
function TaskTableComponent({tasks, showTask, inputUpdate, dataHandle, 
    hideInput, taskData, updateTaskHandle, cancelHandle, handleForm, getTaskData}){


    return(
        <div className="text-center container">
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Fecha creación</th>
                        <th scope="col">Finalizada</th>
                        <th scope="col">Fecha Finalización</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody className="text-start">
                    { tasks ? (
                        tasks.map(data => {
                            return(
                                <tr key={data._id} style={showTask ? null : inputUpdate}>
                                    <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        {data.description}
                                    </td>
                                    <td>{moment(data.date_created).format('D/M/YYYY, h:mm:ss a')}</td>
                                    <td className="text-center">{data.is_complete ? ('Si') : ('No')}</td>
                                    <td>{data.date_finish ? (moment(data.date_finish).format('D/M/YYYY, h:mm:ss a')) : ('')}</td>
                                    <td className="text-center">
                                        <button type="button" onClick={getTaskData(data, true)} className="btn btn-sm btn-warning me-2 mb-1">Editar</button>
                                        <button type="button" onClick={getTaskData(data)} className="btn btn-sm btn-primary me-2 mb-1" data-bs-toggle="modal" data-bs-target="#finishModal">Finalizar</button>
                                        <button type="button" onClick={getTaskData(data)} className="btn btn-sm btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteModal">Eliminar</button>
                                    </td>
                                </tr>
                            )
                        })
                        ) : (<tr colSpan="6"><td>No existen tareas</td></tr>)
                    }
                    {/* Añadir unos inputs nuevos para actualizar name y description: */}
                    <tr style={hideInput ? inputUpdate : null}>
                        <td>
                            <input name="name" className="col me-2 form-control form-sm" type="text" placeholder="Título" value={taskData.name} onChange={dataHandle} />
                        </td>
                        <td>
                            <input name="description" className="col me-2 form-control" type="text" placeholder="Descripción" value={taskData.description} onChange={dataHandle} />
                        </td>
                        <td>{moment(taskData.dateCreated).format('D/M/YYYY, h:mm:ss a')}</td>
                        <td className="text-center">{taskData.isComplete ? ('Si') : ('No')}</td>
                        <td>{taskData.dateFinish ? (moment(taskData.dateFinish).format('D/M/YYYY, h:mm:ss a')) : ('')}</td>
                        <td className="text-center">
                            <button type="button" onClick={updateTaskHandle} className="btn btn-sm btn-success me-2 mb-1">Guardar</button>
                            <button type="button" onClick={cancelHandle} className="btn btn-sm btn-primary me-2 mb-1" >Cancelar</button>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colSpan="3" >
                            <form className="row input-group-sm" onSubmit={handleForm}>
                                <input name="name" className="col me-2 form-control form-sm" type="text" placeholder="Título" onChange={dataHandle} />
                                <input name="description" className="col me-2 form-control" type="text" placeholder="Descripción"  onChange={dataHandle} />
                                <input className="col me-2 form-control btn btn-success" type="submit" value="Crear tarea" />
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TaskTableComponent;