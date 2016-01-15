///<reference path='e:/tsdefination/jake/jake.d.ts' />
///<reference path='e:/tsdefination/node/node.d.ts' />

import * as fs from 'fs';

function runexe(cmd:string){
    console.log('>exec '+cmd);
    var ex = jake.createExec([cmd]);
    ex.addListener("stdout", function(output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function(error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function() {
        complete();
    });
    ex.addListener("error", function() {
        //console.log('error');
        //fail("Compilation unsuccessful");
    });
    ex.run();    
}

/**
 * 编译一个目录，目录下面需要有tsconfig.json
 */
function compileDir(path:string,outdir:string){
    var f_outdir = (outdir&&outdir.length>0)?('--outDir '+outdir):'';
    var cmd = 'tsc -p '+ path + ' '+
        f_outdir +
        ' -t ES6 -m commonjs ';
    runexe(cmd);        
}

directory('out');

task('buildTestCase',['out'],(...params:any[])=>{
    console.log('开始编译test...');
});

task('buildProj',[],function(){compileDir('.','out');});

task("local",['buildProj'],(...params:any[])=>{
    //拷贝到ni中
    fs.writeFileSync('../node_modules/node-inspector/lib/BaseInfoDataSv.js',fs.readFileSync('./out/baseInfo/BaseInfoDataSv.js'));
});

function getSourceFileName(name:string):string{
    var ret=name;
    if(name.indexOf('out/')===0){
        ret = ret.substr(4);
    }
    return ret.substr(0,ret.length-3)+".ts";
}

rule(/.js/,getSourceFileName,[],function(){
    console.log('rule source:'+this.source+',name:'+this.name);
    fs.writeFileSync(this.name,'');
});


task('testjake',['jakeFile.js']);

task("default", ["local"]);

jake.on('complete', ()=>{
    console.log('complete.');
});