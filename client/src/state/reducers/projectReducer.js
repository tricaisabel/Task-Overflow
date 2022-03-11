let initialState=[];

function changeState(state,project){
    let newState=[...state];
    newState.add(project);
    return newState;
}

export default function userReducer(state=initialState,action){
    console.log(action);
    
    if(action.type==="addProject"){
        state=changeState(state,action.payload);
        return state; 
    }
    else{
        return state;
    }
    
    
}
