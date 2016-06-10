var jsonfile = require("jsonfile");

function DrugstoreController () {
    
}

DrugstoreController.prototype.getAll = function (callback) {
    jsonfile.readFile('./models/drugstores.json', function(error, drugstores) {
        if(error){
            callback(null, error);
        }
        else{
            callback(drugstores);
        }
    });
};

DrugstoreController.prototype.getName = function (_name,callback) {
    jsonfile.readFile('./models/drugstores.json', function(error, drugstores) {
        var drugstores_name = []; 
        if(error){
            callback(null, error);
        }
        else{
            _name = _name.toUpperCase();
            for(var i=0;i<drugstores.length;i++){
                if(drugstores[i].nome.indexOf(_name) >= 0) drugstores_name.push(drugstores[i]);
            }
            if(drugstores_name.length==0){
                callback(null,{error:"Não existe farmácias com esse nome"})
            }
            else{
                callback(drugstores_name);
            }
    }
    });
};

DrugstoreController.prototype.getState = function (_state,callback) {
    jsonfile.readFile('./models/drugstores.json', function(error, drugstores) {
        var drugstores_state = []; 
        if(error){
            callback(null, error);
        }
        else{
            _state = _state.toUpperCase();
            var states = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];
            if(states.indexOf(_state) >= 0){
                for(var i=0;i<drugstores.length;i++){
                    if(drugstores[i].name!="" && drugstores[i].estado==_state) drugstores_state.push(drugstores[i]);
                }
                callback(drugstores_state);
            }
            else{
                callback(null,{error:"Estado não existe"})
            }
        }
    });
};

DrugstoreController.prototype.getCity = function (_state,_city,callback) {
    jsonfile.readFile('./models/drugstores.json', function(error, drugstores) {
        var drugstores_city = []; 
        if(error){
            callback(null, error);
        }
        else{
            _city = _city.toUpperCase();
            _state = _state.toUpperCase();
            var states = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];
            if(states.indexOf(_state) >= 0){
                for(var i=0;i<drugstores.length;i++){
                    if(drugstores[i].name!="" && drugstores[i].cidade==_city && drugstores[i].estado==_state) drugstores_city.push(drugstores[i]);
                }
                if(drugstores_city.length==0){
                    callback(null,{error:"Não existe farmácias nessa cidade"})
                }
                else{
                    callback(drugstores_city);
                }
            }
            else{
                callback(null,{error:"Estado não existe"})
            }
        }
    });
};

DrugstoreController.prototype.getDistrict = function (_state,_city,_district,callback) {
    jsonfile.readFile('./models/drugstores.json', function(error, drugstores) {
        var drugstores_district = []; 
        if(error){
            callback(null, error);
        }
        else{
            _district = _district.toUpperCase();
            _city = _city.toUpperCase();
            _state = _state.toUpperCase();

            var states = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];
            
            if(states.indexOf(_state) >= 0){
                for(var i=0;i<drugstores.length;i++){
                    if(drugstores[i].name!="" && drugstores[i].bairro==_district && drugstores[i].cidade==_city && drugstores[i].estado==_state) drugstores_district.push(drugstores[i]);
                }
                if(drugstores_district.length==0){
                    callback(null,{error:"Não existe farmácias nesse bairro"})
                }
                else{
                    callback(drugstores_district);
                }
            }
            else{
                callback(null,{error:"Estado não existe"})
            }
        }
    });
};


module.exports = DrugstoreController;