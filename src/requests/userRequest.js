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

async function getUser(setForm, setId, setAvatar){
    await axios.get(`${url_base}/users`, config)
    .then(response => {
        let data = {
            name: response.data.user.name ? response.data.user.name : "", 
            lastname: response.data.user.lastname ? response.data.user.lastname : "", 
            email: response.data.user.email ? response.data.user.email : ""
        };
        let form = {};
        setForm({...form, ...data});
        setId(response.data.user._id ? response.data.user._id : "");
        setAvatar(response.data.user.avatar ? response.data.user.avatar : null);
    }).catch(error =>{
        console.log(error);
    })
}

async function updateUser(id, form, setAvatar, setAlertSuccess, setAlertMessage){
    const formData = new FormData();
    console.log(form.email);
    formData.append("name", form.name);
    formData.append("lastname", form.lastname);
    if(form.email){
        formData.append("email", form.email);
    }
    if(form.password){
        formData.append("password", form.password);
    }
    try{
        formData.append(
            "avatar",
            form.file,
            form.file.name
        )
    }catch(error){
        console.log("no se ha cargado archivo");
    }
    console.log(formData);
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
        setUserame(response.data.user.name ? response.data.user.name : "Usuario");
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
