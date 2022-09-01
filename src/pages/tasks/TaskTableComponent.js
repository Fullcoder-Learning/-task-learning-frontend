// importar hook usestate:
import {useState} from 'react';
import DeleteTaskModalComponent from './DeleteTaskModalComponent';
// cargar componente:
import FinishTaskModalComponent from './FinishTaskModalComponent';

function TaskTableComponent(){
    // creamos un hook con el contenido de la tabla:
    const [dummyData, setDummyData] =  useState([
        {_id: 1, name: "Cocinar", description: "Cocinar galletas el sábado", date_created: "08/08/2022", is_complete: true, date_finish: "10/08/2022"},
        {_id: 2, name: "Preparar proyecto", description: "Preparar proyecto para presentar en Septiembre", date_created: "15/08/2022", is_complete: false},
        {_id: 3, name: "Estudiar Java", description: "Aprender Java para cubrir las especificaciones del proyecto", date_created: "19/08/2022", is_complete: false}
    ])

    // preparar hook para recuperar id, titulo y descripción:
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    // crear handle para id:
    const dataHandle = (id, name) => {
        return (e)=>{
            setId(id);
            setName(name);
        }
    }

    // crear handle para título:
    const handleName = (e) => {
        setName(e.target.value);
    }

    // crear handle para descripcion:
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    // crear handle para formulario:
    const handleForm = (e) => {
        e.preventDefault();
        setDummyData(task => [...task, {_id: 4, name: name, description: description}])

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
                    {
                        dummyData.map(data => {
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
                        })
                    }
                    {/* Crear un formulario para añadir nuevas tareas: */}
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
            {/* Añadimos el componente y le pasamos el hook id: */}
            <FinishTaskModalComponent id={id} name={name} />
            <DeleteTaskModalComponent id={id} name={name} />
        </div>
    )
}

export default TaskTableComponent;