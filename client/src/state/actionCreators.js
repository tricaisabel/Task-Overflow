export const updateLoginUsername=(newUsername)=>{
    return(dispatch)=>{
        dispatch({
            type:"updateUsername",
            payload:newUsername
        })
    }
}
export const updateLoginPassword=(newPassword)=>{
    return(dispatch)=>{
        dispatch({
            type:"updatePassword",
            payload:newPassword
        })
    }
}