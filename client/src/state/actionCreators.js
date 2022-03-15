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
export const addProjects=(projects)=>{
    return(dispatch)=>{
        dispatch({
            type:"addProjects",
            payload:projects
        })
    }
}

export const initialState=()=>{
    return(dispatch)=>{
        dispatch({
            type:"initialState"
        })
    }
}
