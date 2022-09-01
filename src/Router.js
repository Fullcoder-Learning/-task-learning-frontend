import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Fragment} from 'react';

import TaskPage from './pages/tasks/TaskPage';
import UserPage from './pages/users/UserPage';
import LoginPage from './pages/login/LoginPage';
// importar el componente para resetear password:
import ResetPasswordPage from './pages/reset/ResetPasswordPage';

function Router(){
    return(
        <Fragment>  
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<TaskPage />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* Añadir ruta para restablecer contraseña: */}
                    <Route path="/reset" element={<ResetPasswordPage />} />
                    <Route path="*" element={<h1>Error 404 - No se encuentra la página</h1>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}

export default Router;