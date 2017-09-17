#!/usr/bin/env node

var fs = require('fs');
var mkdirp = require('mkdirp');
var clip = require("node-clip")();
var ncp = require("copy-paste");


// command parameter libraries
// https://www.npmjs.com/package/commander
// https://www.npmjs.com/package/optimist

// get parameter
var param1 = process.argv[2]; // `-c` or `-f` or `output path` or undefined
var param2 = process.argv[3]; // `input path (-f)` or `output path (-c)` or undefined
//var param3 = process.argv[4]; // output-path or undefined

//var specialKeys = { func: ".js", x: ".txt", y: ".txt", template: ".txt" };
var specialKeys = { func: ".js", template: ".txt" };

var arrObj = [];

var divisioner = function (json, outputname, outputdir) {
    var jsonObject = JSON.parse(json);
    var posijson = [];
    // node loop
    jsonObject.forEach(function (noderedNode) {
        //console.log(noderedNode);
        posijson.push({ id: noderedNode.id, type: noderedNode.type, name: noderedNode.name, x: noderedNode.x, y: noderedNode.y });
        // key loop
        Object.keys(noderedNode).forEach(function (key) {
            // this = noderedNode
            if (specialKeys.hasOwnProperty(key) ) {
                arrObj.push({ id: this.id, type: this.type, key: key, value: this[key], ext: specialKeys[key] });
                this[key] = "";
            }
        }, noderedNode);
        
        arrObj.push({ id: noderedNode.id, type: noderedNode.type, key: "_node", value: JSON.stringify(noderedNode, null, "  "), ext: ".json" });
    });

    // save
    mkdirp(outputdir + "/nodes", function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile(outputdir + "/" + outputname, json, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            arrObj.forEach(function (obj) {
                var filedir = outputdir + "/nodes/" + obj.type + "-" + obj.id;
                mkdirp(filedir, function (err) {
                    fs.writeFile(filedir + "/" + obj.key + obj.ext, obj.value, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            });
        }
    });
};
//console.log(param2);

var clipjson = ncp.paste();
if (param1 === "check") {
    console.log(clipjson);
    return;
} else if (param2 == undefined) {
    
    console.log(clipjson);

    //var outputfilename = param2;
    //var outputdirpath = param3;
    var outputdirpath = param1;
    // no check

    divisioner(clipjson, "flow.json", outputdirpath);
    
    /*
    //console.log("clipboard");
    clip.read("general", function (err, value) {
        //console.log(value);
        divisioner(value, "flow.json", outputdirpath);
    });*/

}
return;
