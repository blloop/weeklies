import React from "react";

const WarningDialog = props => (
    props.text &&
        <>
            <div
                className='modal-bg'
                style={{ zIndex: 14 }}
                onClick={() => props.setWarning('')}/>
            <div className='dialog overlay confirm'>
                <button
                    onClick={() => props.setWarning('')}
                    className='close-button'>
                    &#10005;
                </button>
                <p className='warning'> Warning! </p>
                {props.text}
            </div>
        </>
);

export default WarningDialog;