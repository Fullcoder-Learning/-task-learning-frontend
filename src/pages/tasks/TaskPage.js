import {Fragment} from 'react';
import NavBarCommon from '../../common/NavbarCommon';
import TaskTableComponent from './TaskTableComponent';

function TaskPage(){
    return(
        <Fragment>
            <NavBarCommon />
            <TaskTableComponent />
        </Fragment>
    )
}

export default TaskPage;