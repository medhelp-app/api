var jsonfile = require("jsonfile");

function DiseaseController () {
    
}

DiseaseController.prototype.getAll = function (callback) {
    jsonfile.readFile('./models/disease.json', function(error, diseases) {
        if(error){
            callback(null, error);
        }
        else{
            callback(diseases);
        }
    });
};

DiseaseController.prototype.getName = function (_disease,callback) {
    jsonfile.readFile('./models/disease.json', function(error, diseases) {
        var diseases_name = []; 
        if(error){
            callback(null, error);
        }
        else{
            for(var i=0;i<diseases.length;i++){
                if(diseases[i].indexOf(_disease) >= 0) diseases_name.push(diseases[i]);
            }
            if(diseases_name.length==0){
                callback(null,{error:"Não existe doença com esse nome"})
            }
            else{
                callback(diseases_name);
            }
        }
    });
};

module.exports = DiseaseController;