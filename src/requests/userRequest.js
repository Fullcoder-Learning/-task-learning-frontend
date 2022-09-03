import axios from 'axios';

const url_base = "http://localhost:5000/api"

// cargamos el token:
const config = {
    headers: {
        Authorization: localStorage.getItem("token") 
    }  
}


async function registerRequest(email, password, setAlert){
    await axios.post(`${url_base}/register`, {
        email: email,
        password: password
    }) 
    .then(response => {
        setAlert(true);
        window.setTimeout(()=>{
            setAlert(false);
        }, 3000);
    }).catch(error =>{
        console.log(error);
    });
}

async function loginRequest(email, password){
    await axios.post(`${url_base}/login`, {
        email: email,
        password: password
    }) 
    .then(response => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
    }).catch(error =>{
        console.log(error);
    });
}

async function forgotRequest(email, alertState){
    await axios.post(`${url_base}/forgot`, {
        email: email
    }) 
    .then(response => {
        alertState(true);
        window.setTimeout(()=>{
            alertState(false);
        }, 3000);
    }).catch(error =>{
        console.log(error);
    });
}
async function resetRequest(newPassword, repiteNewPassword, id, token, alertState){
    await axios.put(`${url_base}/reset/${id}/${token}`, {
        newPassword: newPassword,
        repitePassword: repiteNewPassword
    }) 
    .then(response => {
        alertState(true);
        window.setTimeout(()=>{
            window.location.href = "/login";
        }, 3000);
    }).catch(error =>{
        console.log(error);
    });
}

async function getUser(setName, setLastname, setEmail, setId, setFile){
    await axios.get(`${url_base}/users`, config)
    .then(response => {
        setName(response.data.user.name ? response.data.user.name : "");
        setLastname(response.data.user.lastname ? response.data.user.lastname : "");
        setEmail(response.data.user.email ? response.data.user.email : "");
        setId(response.data.user._id ? response.data.user._id : "");
        setFile(response.data.user.avatar ? response.data.user.avatar : null);
    }).catch(error =>{
        console.log(error);
    })
}

// update user:
async function updateUser(id, name, lastname, email, password, file, setAvatar){
    // creamos un objeto tipo FormData para enviar archivos:
    const formData = new FormData();
    // cargamos los detalles del archivo con formdata ya que estamos usando formularios en lugar de json:
    formData.append("name", name);
    formData.append("lastname", lastname);
    if(email){
        formData.append("email", email);
    }
    if(password){
        formData.append("password", password);
    }
    try{
        // pasar la imagen con su nombre de campo y valores:
        formData.append(
            "avatar",
            file,
            file.name
        )
    }catch(error){
        console.log("no se ha cargado archivo");
    }

    await axios.put(`${url_base}/users/${id}`, formData, config)
    .then(response => {
        console.log("Se han guardado los cambios");
        // actualizar hook del avatar que se muestra:
        setAvatar(response.data.user.avatar ? response.data.user.avatar : null);
    }).catch(error => {
        console.log(error);
    })
}


export{
    registerRequest,
    loginRequest,
    forgotRequest,
    resetRequest,
    getUser,
    updateUser // exportar modulo
}
