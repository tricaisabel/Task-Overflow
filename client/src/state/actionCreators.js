export const updateUserField=(field,value)=>{
    return(dispatch)=>{
        dispatch({
            type:"updateUserField",
            field:field,
            value:value
        })
    }
}
