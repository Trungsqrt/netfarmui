import React from 'react';
import './Radio.css';
function Popup(props) {
    return (
        <div className="popup-wrapper">
            <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={props.closePopup}>
                        X
                    </button>
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Popup;
