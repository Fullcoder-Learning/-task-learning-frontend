// importar hook useeffect para listar:
import {useState, useEffect} from 'react';
import DeleteTaskModalComponent from './DeleteTaskModalComponent';
import FinishTaskModalComponent from './FinishTaskModalComponent';
import {createTaskRequest, ListTaskRequest} from '../../requests/taskRequest';

function TaskTableComponent(){
    const [tasks, setTasks] = useState(null);

    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(()=>{
        ListTaskRequest(setTasks);
    },[]);

    const dataHandle = (id, name) => {
        return (e)=>{
            setId(id);
            setName(name);
        }
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleForm = (e) => {
        e.preventDefault();
        createTaskRequest(name, description, setTasks);
    }

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
                                <tr key={data._id}>
                                    <td>{data.name}</td>
                                    <td>{data.description}</td>
                                    <td>{data.date_created}</td>
                                    <td className="text-center">{data.is_complete ? ('Si') : ('No')}</td>
                                    <td>{data.date_finish ? (data.date_finish) : ('')}</td>
                                    <td className="text-center">
                                        <button type="button" onClick={dataHandle(data._id, data.name)} className="btn btn-sm btn-primary me-2 mb-1" data-bs-toggle="modal" data-bs-target="#finishModal">Finalizar</button>
                                        <button type="button" onClick={dataHandle(data._id, data.name)} className="btn btn-sm btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteModal">Eliminar</button>
                                    </td>
                                </tr>
                            )
                        })) : (<tr colSpan="6"><td>No existen tareas</td></tr>)
                    }
                    <tr className="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colSpan="3" >
                            <form className="row input-group-sm" onSubmit={handleForm}>
                                <input className="col me-2 form-control form-sm" type="text" placeholder="Título" onChange={handleName} />
                                <input className="col me-2 form-control" type="text" placeholder="Descripción"  onChange={handleDescription} />
                                <input className="col me-2 form-control btn btn-success" type="submit" value="Crear tarea" />
                            </form>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
            <FinishTaskModalComponent id={id} name={name} tasks={tasks} setTasks={setTasks} />
            <DeleteTaskModalComponent id={id} name={name} tasks={tasks} setTasks={setTasks} />
        </div>
    )
}

export default TaskTableComponent;