import axios from 'axios';

const config = {
    headers: {
        Authorization: localStorage.getItem("token") 
    }  
}

const url_base = "http://localhost:5000/api";

async function createTaskRequest(name, description, taskState){
    await axios.post(`${url_base}/tasks`, {
        name: name,
        description: description
    }, config) 
    .then(response =>{
        taskState(tasks => [...tasks, response.data.task]);
    }).catch(error =>{
        console.log(error);
    });
}

async function ListTaskRequest(status){ 
    await axios.get(`${url_base}/tasks`, config) 
    .then(response => {
        status(response.data);
        console.log(response.data);
    }).catch(error =>{
        console.log(error);
    });
}

async function setOK(tasks, setTasks, id){ 
    await axios.patch(`${url_base}/tasks/${id}`, {}, config)
    .then(response =>{
        console.log('tareas:');
        console.log(tasks);
        tasks.map(task =>{
            if(task._id === id){
                task.is_complete = true
            }
            return(null);
        });
        
        console.log(tasks);
        setTasks(tasks => [...tasks]);
    }).catch(error =>{
        console.log(error);
    })
}

// eliminar tarea:
async function deleteTask(tasks, setTasks, id){
    await axios.delete(`${url_base}/tasks/${id}`, config)
    .then(response => {
        // eliminar tarea de la colección:
        setTasks(tasks => [...tasks.filter(task => task._id !== id)]);
    }).catch(error =>{  
        console.log(error);
    })
}

export{
    createTaskRequest,
    ListTaskRequest,
    setOK,
    deleteTask // exportar modulo
}