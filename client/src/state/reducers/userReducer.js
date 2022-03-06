let fields=["logged","username","gitUsername","firstName","lastName","password","job","role","profilePicture"];
let initialState={"logged":false};
fields.forEach(field=>initialState[field]="");

function changeState(state,field,value){
    let newState={...state};
    newState[field]=value;
    return newState;
}

const reducer=(state=initialState,action)=>{
    try{
        // const type=action.type.split("update")[1].toLowerCase();
        if(action.type==="updateUserField" && fields.includes(action.field)){
            state=changeState(state,action.field,action.value);
        }
    }
    finally{
       return state; 
    }
    
}

export default reducer;