// importar modulo navigate para redireccionar:
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {Fragment} from 'react';
// importar jwt: 
import {useJwt} from 'react-jwt';

import TaskPage from './pages/tasks/TaskPage';
import UserPage from './pages/users/UserPage';
import LoginPage from './pages/login/LoginPage';
import ResetPasswordPage from './pages/reset/ResetPasswordPage';

// volver función asincrona:
function Router(){
    // recuperar token:
    const localToken = localStorage.getItem("token");
    // comprobar si ha caducado:
    const {isExpired} = useJwt(localToken);
    // crear una redirección si no se cumplen las condiciones:
    const redirect = <Navigate replace to='/login' />

    return(
        <Fragment>  
            <BrowserRouter>
                <Routes>
                    {/* Ahora se cambia el estado del componente raiz por RouteGuard: */}
                    <Route exact path="/" element={
                            isExpired ? redirect : <TaskPage />} />
                    <Route exact path="/users" element={
                            isExpired ? redirect : <UserPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* Añadir ruta para restablecer contraseña: */}
                    <Route path="/reset/:id/:token" element={<ResetPasswordPage />} />
                    <Route path="*" element={<h1>Error 404 - No se encuentra la página</h1>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}

export default Router;