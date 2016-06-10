var jsonfile = require("jsonfile");

function MedicineController () {
    
}

MedicineController.prototype.getAll = function (callback) {
    jsonfile.readFile('./models/medicines.json', function(error, medicines) {
        if(error){
            callback(null, error);
        }
        else{
            callback(medicines);
        }
    });
};

MedicineController.prototype.getName = function (_name,callback) {
    jsonfile.readFile('./models/medicines.json', function(error, medicines) {
        var medicines_name = []; 
        if(error){
            callback(null, error);
        }
        else{
            _name = _name.toUpperCase();
            for(var i=0;i<medicines.length;i++){
                if(medicines[i].nome.indexOf(_name) >= 0) medicines_name.push(medicines[i]);
            }
            if(medicines_name.length==0){
                callback(null,{error:"Não existe remédio com esse nome"})
            }
            else{
                callback(medicines_name);
            }
        }
    });
};

MedicineController.prototype.getCompanyName = function (_name,callback) {
    jsonfile.readFile('./models/medicines.json', function(error, medicines) {
        var medicines_company = []; 
        if(error){
            callback(null, error);
        }
        else{
            for(var i=0;i<medicines.length;i++){
                if(medicines[i].empresa==_name) medicines_company.push(medicines[i]);
            }
            if(medicines_company.length==0){
                callback(null,{error:"Não existe remédio com esse nome nessa empresa"})
            }
            else{
                callback(medicines_company);
            }
        }
    });
};

MedicineController.prototype.getCompany = function (callback) {
    jsonfile.readFile('./models/medicines.json', function(error, medicines) {
        var company = []; 
        if(error){
            callback(null, error);
        }
        else{
            for(var i=0;i<medicines.length;i++){
                if(company.indexOf(medicines[i].empresa)<0) company.push(medicines[i].empresa);
            }
            callback(company);
        }
    });
};

MedicineController.prototype.get = function (_id,callback) {
    jsonfile.readFile('./models/medicines.json', function(error, medicines) {
        var medicine = ""; 
        if(error){
            callback(null, error);
        }
        else{
            for(var i=0;i<medicines.length;i++){
                if(medicines[i].id==_id) {
                    medicine = medicines[i];
                    break;
                }
            }
            if(medicine==""){
                callback(null,{error:"Esse id não existe"})
            }
            else{
                callback(medicine);
            }
        }
    });
};

module.exports = MedicineController;