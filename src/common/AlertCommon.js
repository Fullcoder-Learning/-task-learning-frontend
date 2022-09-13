import {Fragment} from 'react';

function AlertCommon({alertSuccess, alertError, alertMessage}){

    return(
        <Fragment>
            <div className={alertSuccess === true ? "alert alert-success show-alert" : "alert alert-success show-alert fade"} role="alert">
                {alertMessage}
            </div>
            <div className={alertError === true ? "alert alert-warning show-alert" : "alert alert-success show-alert fade"} role="alert">
                {alertMessage}
            </div>
        </Fragment>
    )
}

export default AlertCommon;