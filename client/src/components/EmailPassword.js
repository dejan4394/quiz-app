import React from 'react'

const EmailPassword = ({type,name, value, onChange}) => {
    return (
        <input type={type} name={name} value={value} onChange={onChange} />
    )
}

export default EmailPassword
