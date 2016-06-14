var jsonfile = require("jsonfile");
var Functions = require('../util/functions');

function DiseaseController () {
    this.functions = new Functions();
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
    var functions = this.functions;
    jsonfile.readFile('./models/disease.json', function(error, diseases) {
        var diseases_name = []; 
        if(error){
            callback(null, error);
        }
        else{
            for(var i=0;i<diseases.length;i++){
                if(functions.search(diseases[i],_disease)) diseases_name.push(diseases[i]);
            }
            if(diseases_name.length==0){
                callback({success:"Não existe doença com esse nome"})
            }
            else{
                callback(diseases_name);
            }
        }
    });
};

module.exports = DiseaseController;