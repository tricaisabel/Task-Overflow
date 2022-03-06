let fields=["logged","id","username","gitUsername","firstName","lastName","password","job","role","profilePicture"];
let initialState={"logged":false};
fields.forEach(field=>initialState[field]="");

function changeState(state,field,value){
    let newState={...state};
    newState[field]=value;
    return newState;
}

export default function userReducer(state=initialState,action){
    console.log(action);
    
    if(action.type==="updateUserField" && fields.includes(action.field)){
        state=changeState(state,action.field,action.value);
        return state; 
    }
    else if(action.type==="updateUser"){
        Object.keys(action.payload).forEach(function(key) {
            state[key] = action.payload[key];
        })
        return state; 
    }
    else{
        return state;
    }
    
    
}
