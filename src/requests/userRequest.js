import axios from 'axios';

const url_base = "http://localhost:5000/api"

const config = {
    headers: {
        Authorization: localStorage.getItem("token") 
    }  
}


async function registerRequest(email, password, setAlertSuccess, setAlertError, setAlertMessage){
    await axios.post(`${url_base}/register`, {
        email: email,
        password: password
    }) 
    .then(response => {
        setAlertSuccess(true);
        setAlertMessage("Registro realizado con éxito. Ya puedes iniciar sesión.");
        window.setTimeout(()=>{
            setAlertSuccess(false);
        }, 3000);
    }).catch(error =>{
        console.log(error);
        setAlertError(true);
        setAlertMessage("Error al crear usuario, el email ya existe.");
        window.setTimeout(()=>{
            setAlertError(false);
        }, 3000);
    });
}

async function loginRequest(email, password, setAlertError, setAlertMessage){
    await axios.post(`${url_base}/login`, {
        email: email,
        password: password
    }) 
    .then(response => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
    }).catch(error =>{
        console.log(error);
        setAlertError(true);
        setAlertMessage("Error al iniciar sesión, usuario o contraseña incorrectos.");
        window.setTimeout(()=>{
            setAlertError(false);
        }, 3000);
    });
}

async function forgotRequest(email, setAlertSuccess, setAlertError, setAlertMessage){
    await axios.post(`${url_base}/forgot`, {
        email: email
    }) 
    .then(response => {
        setAlertSuccess(true);
        setAlertMessage("Se ha enviado un email para restablecer contraseña, por favor revisa tu bandeja de entrada.");
        window.setTimeout(()=>{
            setAlertSuccess(false);
        }, 3000);
    }).catch(error =>{
        console.log(error);
        setAlertError(true);
        setAlertMessage("Error, el email introducido no existe.");
        window.setTimeout(()=>{
            setAlertError(false);
        }, 3000);
    });
}


async function resetRequest(newPassword, repiteNewPassword, id, token, setAlertSuccess, setAlertMessage){
    await axios.put(`${url_base}/reset/${id}/${token}`, {
        newPassword: newPassword,
        repitePassword: repiteNewPassword
    }) 
    .then(response => {
        setAlertSuccess(true);
        setAlertMessage("Contraseña restablecida con éxito. Ya puedes iniciar sesión.");
        window.setTimeout(()=>{
            setAlertSuccess(false);
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

async function updateUser(id, name, lastname, email, password, file, setAvatar, setAlertSuccess, setAlertMessage){
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    if(email){
        formData.append("email", email);
    }
    if(password){
        formData.append("password", password);
    }
    try{
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
        setAvatar(response.data.user.avatar ? response.data.user.avatar : null);
        setAlertSuccess(true);
        setAlertMessage("Se han actualizado los datos.");
        window.setTimeout(()=>{
            setAlertSuccess(false);
        }, 3000);
    }).catch(error => {
        console.log(error);
    })
}

async function getNavUser(setUserame, setAvatar){
    await axios.get(`${url_base}/users`, config)
    .then(response => {
        setUserame(response.data.user.name ? response.data.user.name : "");
        setAvatar(response.data.user.avatar ? response.data.user.avatar : null);
    }).catch(error =>{
        console.log(error);
    })
}

async function deleteUserRequest(id){
    await axios.delete(`${url_base}/users/${id}`, config)
    .then(response => {
        localStorage.clear();
        window.location.href = '/login';
    }).catch(error =>{
        console.log(error);
    })
}

export{
    registerRequest,
    loginRequest,
    forgotRequest,
    resetRequest,
    getUser,
    updateUser,
    getNavUser,
    deleteUserRequest 
}
