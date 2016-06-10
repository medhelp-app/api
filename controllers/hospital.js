var jsonfile = require("jsonfile");

function HospitalController () {
    
}

HospitalController.prototype.getAll = function (callback) {
    jsonfile.readFile('./models/hospitals.json', function(error, hospitals) {
        if(error){
            callback(null, error);
        }
        else{
            callback(hospitals);
        }
    });
};

HospitalController.prototype.getName = function (_name,callback) {
    jsonfile.readFile('./models/hospitals.json', function(error, hospitals) {
        var hospitals_name = []; 
        if(error){
            callback(null, error);
        }
        else{
            _name = _name.toUpperCase();
            for(var i=0;i<hospitals.length;i++){
                if(hospitals[i].nome.indexOf(_name) >= 0) hospitals_name.push(hospitals[i]);
            }
            if(hospitals_name.length==0){
                callback(null,{error:"Não existe hospital com esse nome"})
            }
            else{
                callback(hospitals_name);
            }
        }
    });
};

HospitalController.prototype.getState = function (_state,callback) {
    jsonfile.readFile('./models/hospitals.json', function(error, hospitals) {
        var hospitals_state = []; 
        if(error){
            callback(null, error);
        }
        else{
            _state = _state.toUpperCase();
            var states = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];
            if(states.indexOf(_state) >= 0){
                for(var i=0;i<hospitals.length;i++){
                    if(hospitals[i].estado==_state) hospitals_state.push(hospitals[i]);
                }
                callback(hospitals_state);
            }
            else{
                callback(null,{error:"Estado não existe"})
            }
        }
    });
};

HospitalController.prototype.getCity = function (_state,_city,callback) {
    jsonfile.readFile('./models/hospitals.json', function(error, hospitals) {
        var hospitals_city = []; 
        if(error){
            callback(null, error);
        }
        else{
            _city = _city.toUpperCase();
            _state = _state.toUpperCase();
            var states = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];
            if(states.indexOf(_state) >= 0){
                for(var i=0;i<hospitals.length;i++){
                    if(hospitals[i].cidade.toUpperCase()==_city && hospitals[i].estado==_state) hospitals_city.push(hospitals[i]);
                }
                if(hospitals_city.length==0){
                    callback(null,{error:"Não existe farmácias nessa cidade"})
                }
                else{
                    callback(hospitals_city);
                }
            }
            else{
                callback(null,{error:"Estado não existe"})
            }
        }
    });
};

HospitalController.prototype.getDistrict = function (_state,_city,_district,callback) {
    jsonfile.readFile('./models/hospitals.json', function(error, hospitals) {
        var hospitals_district = []; 
        if(error){
            callback(null, error);
        }
        else{
            _district = _district.toUpperCase();
            _city = _city.toUpperCase();
            _state = _state.toUpperCase();

            var states = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];
            
            if(states.indexOf(_state) >= 0){
                for(var i=0;i<hospitals.length;i++){
                    if(hospitals[i].bairro==_district && hospitals[i].cidade.toUpperCase()==_city.toUpperCase() && hospitals[i].estado==_state) hospitals_district.push(hospitals[i]);
                }
                if(hospitals_district.length==0){
                    callback(null,{error:"Não existe hospital nesse bairro"})
                }
                else{
                    callback(hospitals_district);
                }
            }
            else{
                callback(null,{error:"Estado não existe"})
            }
        }
    });
};

module.exports = HospitalController;