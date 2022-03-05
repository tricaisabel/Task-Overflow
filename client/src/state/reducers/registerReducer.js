let initialState={
    "logged":false,
	"username":"",
	"githubUsername":"",
	"firstName":"",
	"lastName":"",
	"password":"",
	"password2":"",
	"job":"",
	"role":"",
    "picture":""
};

function changeState(state,property,value){
    let newState={...state};
    newState[property]=value;
    return newState;
}

const reducer=(state=initialState,action)=>{
    console.log(action.type+" "+action.payload);
    switch(action.type){
        case "updateUsername":
            state=changeState(state,"username",action.payload);
            return state;
        case "updatePassword":
            state=changeState(state,"password",action.payload);
            return state;
        default:
            return state;
    }
}

export default reducer;