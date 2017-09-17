#!/usr/bin/env node

var fs = require('fs');
var mkdirp = require('mkdirp');
var ncp = require("copy-paste");

// command parameter libraries
// https://www.npmjs.com/package/commander
// https://www.npmjs.com/package/optimist

// get parameter
var param1 = process.argv[2]; // `check` or `output path`
var param2 = process.argv[3]; // `input file path`

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

var clipjson = ncp.paste();
if (param1 === "check") {
    console.log(clipjson);
    return;
} else if (param2 == undefined) {
    var outputdirpath = param1;
    divisioner(clipjson, "flow.json", outputdirpath);
}
return;
