// npm install request
var fs = require('fs');
var path = require('path');

const name = ['1995-96_TO_2003-04.json', '2004-05_TO_2010-11.json', '2011-12_TO_NOW.json'];
const na = '1995-96_TO_2003-04.json';

var a=0; 
var b=0;
var final = [];
var comp = [];

var c = {
    'name': 'Intermission',
    'freq': 0
}

comp.push(c);

///Users/Jessie/Desktop/A3/1995-96_TO_2003-04.json

function addComp(work){

    var exist = false;

    for (let i = 0; i < comp.length; i++) {

        if (work.composerName == comp[i].name || work.interval == comp[i].name){ 
            comp[i].freq++
            exist = true;
            break;
        } 
    }

    if (!exist){

        var c = {
            'name': work.composerName,
            'freq': 1
        }

        comp.push(c);
    }
}

function countComp(d){

    var count = 0;
    for (let i = 0; i < comp.length; i++) {

        if (d.composerName == comp[i].name || d.interval == comp[i].name){ 
            count = comp[i].freq;
            break;
        } 
    }
return count;
}

function findBrass(i){

    var yesBrass = false;

    for (let j = 0; j < obj.programs[i].concerts.length; j++) {
   
        obj.programs[i].concerts[j].eventType == "Holiday Brass" ? yesBrass = true : a++;
     
     }

     return yesBrass;
}

function findFile(obj){
    
    for (let i = 0; i < obj.programs.length; i++) {
  
        if (findBrass(i)){
            var aa = obj.programs[i];
            
            for (let j = 0; j < aa.works.length; j++) {
                delete aa.works[j].soloists; 
                addComp(aa.works[j]);
            }
            
            final.push(aa);

            }
    }
}


for (let i = 0; i < name.length; i++){ 
    
    var content = fs.readFileSync(name[i]);
    var obj = JSON.parse(content);

    findFile(obj)

}



comp.sort(function(a, b){
    return b.freq - a.freq;
});

var  check = false;

final.forEach(element => {

    var i = 1;

    element.works.forEach( d => {
        d.composerFreq = countComp(d);
        d.order = i;
        if (d.ID == "0*") { d.composerName = "Intermission"; check = true};
        i++;
    })

    if (!check) {console.log(element);}
});

//console.log(final);

  
fs.writeFileSync('holiday.json', JSON.stringify(final, null, 2));