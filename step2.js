// npm install request
var fs = require('fs');

const name = 'holiday.json'
var content = fs.readFileSync(name);
var obj = JSON.parse(content);

var cleanList = [];

obj.forEach(element => {


    element.works.forEach( d => {
        
        if (d.ID == "0*") { d.composerName = "Intermission";};
        var c = {
        
            'season': element.season,
            'order': d.order,
            'composerName': d.composerName,
            'composerFreq': d.composerFreq,
            'workTitle': d.workTitle,

        };
        cleanList.push(c);
 
    })

});

//console.log(final);

  
fs.writeFileSync('holiday_clean.json', JSON.stringify(cleanList, null, 2));