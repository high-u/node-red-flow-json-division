#!/usr/bin/env node

var fs = require('fs');
var mkdirp = require('mkdirp');
var clip = require("node-clip")();

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
            } else if (key === "x" || key === "y") {
                this[key] = "";
            }
        }, noderedNode);
        
        arrObj.push({ id: noderedNode.id, type: noderedNode.type, key: "_node", value: JSON.stringify(noderedNode, null, "  "), ext: ".json" });
    });
    
    //console.log(JSON.stringify(posijson));
    // position(y) sort 
    posijson.sort(function (a, b) {
        if (a.y < b.y) return -1;
        if (a.y > b.y) return 1;
        return 0;
    });
    //console.log(JSON.stringify(posijson));
    var posijsonText = "[";
    var arrspliter = "";
    posijson.forEach(function (item) { 
        posijsonText += arrspliter + "\n  " + JSON.stringify(item);
        arrspliter = ",";
    });
    posijsonText += "\n]"
    //console.log(posijsonText);

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
            fs.writeFile(outputdir + "/nodes/_positions.json", posijsonText, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            arrObj.forEach(function (obj) {
                var filedir = outputdir + "/nodes/" + obj.type + "-" + obj.id;
                //if (obj.key === "x" || obj.key === "y") {
                //    filedir = outputdir + "/nodes/_position/" + obj.type + "-" + obj.id;
                //}
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

if (param2 == undefined) {
    //var outputfilename = param2;
    //var outputdirpath = param3;
    var outputdirpath = param1;
    // no check
    
    //console.log("clipboard");
    clip.read("general", function (err, value) {
        //console.log(value);
        divisioner(value, "flow.json", outputdirpath);
    });
}
return;
