const api= require('../endpoints.json');


const getApi = async  (req, res)=>{
    try{
res.status(200).send({endPoints:api})
}catch(err){
    console.log(err);
}
}

module.exports = {getApi}