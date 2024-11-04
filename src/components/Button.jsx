import React from 'react'

const Button = ({name,color="primary",width="100px",isDisabled=false,fn}) => {
    const buttonColors = {
        primary: "#007bff",
        success: "#28a745",
        warn: "#ffc107",
        danger: "#dc3545"
    }
  return (
    <div>
        <button
         id='btn' 
         style={
            {backgroundColor:buttonColors[color],
            width:width,
            opacity: isDisabled ? "0.65" : "1",
            cursor: isDisabled ? "default" : "pointer"
            }
            }
         disabled={isDisabled}    
         onClick={fn}>

            {name}

        </button>
    </div>
  )
}

export default Button