import {Fragment} from 'react';
import NavBarCommon from '../../common/NavbarCommon';
// importar el formulario:
import UserFormComponent from './UserFormComponent';

function UserPage(){
    return(
        <Fragment>
            <NavBarCommon />
            {/* Cargar el componente: */}
            <UserFormComponent />
        </Fragment>
    )
}

export default UserPage;