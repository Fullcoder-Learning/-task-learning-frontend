// importar hook useeffect para listar:
import {useState, useEffect} from 'react';
import {Fragment} from 'react';
import NavBarCommon from '../../common/NavbarCommon';
import TaskTableComponent from './TaskTableComponent';
// importar componentes de modal:
import DeleteTaskModalComponent from './DeleteTaskModalComponent';
import FinishTaskModalComponent from './FinishTaskModalComponent';
// cargar componente para movil:
import TaskTableComponentMobile from './TaskTableComponentMobile';
// cargar servicio:
import {createTaskRequest, ListTaskRequest, updateTaskRequest} from '../../requests/taskRequest';


function TaskPage(){
    // mover el hook con las tareas:
    const [tasks, setTasks] = useState(null);
    // Crear un nuevo hook que unifica los datos:
    const [taskData, setTaskData] = useState({
        id: null,
        name: "",
        description: "",
        date_created: null,
        is_complete: null,
        date_finish: null,
    });
    // mover hooks para mostrar u ocultar input o texto:
    const [showTask, setShowTask] = useState(true);
    const [hideInput, setHideInput] = useState(true);

    // mover datahandle y revisarlo:
    const dataHandle = (e) => {
        // recuperar campos del target:
        const {name, value} = e.target;

        // se les hace un spread a cada campo y se añaden:
        setTaskData({...taskData, [name]: value});
        console.log(taskData);
    }

    // mover handle para cancelar edición:
    const cancelHandle = (e) => {
        setShowTask(true);
        setHideInput(true);
    }

    // Traer también el updateHandle:
    const updateTaskHandle  = (e) => {
        // actualizar tarea:
        updateTaskRequest(taskData.id, taskData.name, taskData.description, tasks, setTasks);
        // cerrar actualización:
        setShowTask(true);
        setHideInput(true);
    }

    // crear un handle para el botón de editar:
    const editHandleButton = (e) =>{
         // cambiar a modo actualizar:
         setShowTask(false);
         setHideInput(false);
    }

    // crear un nuevo handle para preparar datos a eliminar o finalizar tarea:
    const getTaskData = (id, name, description, createDate, isComplete, dateFinish, updateButtonClick=false) => {
        return (e) => {
            // con el uso de spread le pasamos los datos al hook:
            setTaskData(
                {...taskData, 
                    id: id, name: name, description: description,
                    date_created: createDate, is_complete: isComplete,
                    date_finish: dateFinish
                }
                );
            
            // cambiar a modo actualizar en vista general:
            if(updateButtonClick){
                setShowTask(false);
                setHideInput(false);
                updateButtonClick = false;
            }
        }
    }

    // y traer el handleForm:
    const handleForm = (e) => {
        e.preventDefault();
        createTaskRequest(taskData.name, taskData.description, setTasks);
    }


    // cambiar el useeffect al page:
    useEffect(()=>{
        ListTaskRequest(setTasks);
    },[]);


    // movemos los estilos personalizados:
    const inputUpdate = {display: "none"};

    return(
        <Fragment>
            <NavBarCommon />
            <div className="d-none d-sm-block">
                <TaskTableComponent tasks={tasks} showTask={showTask} 
                inputUpdate={inputUpdate} dataHandle={dataHandle} hideInput={hideInput} 
                taskData={taskData} updateTaskHandle={updateTaskHandle} cancelHandle={cancelHandle}
                handleForm={handleForm} getTaskData={getTaskData} />
            </div>
            <div className="d-sm-none">
                <TaskTableComponentMobile tasks={tasks} showTask={showTask} 
                inputUpdate={inputUpdate} dataHandle={dataHandle} hideInput={hideInput} 
                taskData={taskData} updateTaskHandle={updateTaskHandle} cancelHandle={cancelHandle}
                handleForm={handleForm} getTaskData={getTaskData} editHandleButton={editHandleButton} />
            </div>
            {/* Mover los componentes de modal: */}
            
            <FinishTaskModalComponent id={taskData.id} name={taskData.name} tasks={tasks} setTasks={setTasks} />
            <DeleteTaskModalComponent id={taskData.id} name={taskData.name} tasks={tasks} setTasks={setTasks} />
        </Fragment>
    )
}

export default TaskPage;