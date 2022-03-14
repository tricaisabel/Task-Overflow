//TASKS
//Post Method
async function postRecord(req, res, Model) {
    let dataObj={};
    for (var key in req.body){
        var value = req.body[key];
        dataObj[key]=value;
    }
    const data = new Model(dataObj);
    try{
        await data.save();
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}

//Get all Method
async function getRecords(req, res, Model){
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get by ID Method
async function getRecord(req, res, Model){
    try {
        const data = await Model.findById(req.params.id);
        res.json(data).status(200)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Update by ID Method
async function updateRecord(req, res,Model){
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Delete by ID Method
async function deleteRecord(req, res,Model) {
     try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function existRecord(req,res,Model){
    try {
        let dataObj={};
        for (var key in req.body){
            var value = req.body[key];
            dataObj[key]=value;
        }
        const data = await Model.find(dataObj);
        Object.keys(data).length>0 ? res.status(200).json(data).send() : res.status(404).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getUserProjects(req,res,Model){
    try {
        const data = await Model.find( { team: req.params.username } )
        res.json(data).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export{
    postRecord,getRecord,getRecords,updateRecord,deleteRecord,existRecord, getUserProjects
}