let initialState=[];

export default function userReducer(state=initialState,action){  
    if(action.type==="addProjects"){
        state=action.payload;
        return state; 
    }
    else{
        return state;
    }
    
    
}
