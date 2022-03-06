export const updateUserField=(field,value)=>{
    return(dispatch)=>{
        dispatch({
            type:"updateUserField",
            field:field,
            value:value
        })
    }
}
export const updateUser=(user)=>{
    return(dispatch)=>{
        dispatch({
            type:"updateUser",
            payload:user
        })
    }
}
