///<reference path="e:/tsdefination/node/node.d.ts" />
'use strict';
import * as net from "net";
var baseinfoSvPort=9981;
var log=console.log;
class BaseInfoDataSv{
    _socket = net.createServer();
    _client:net.Socket=null;    //client
    constructor(){
        
    }
    
    //启动服务
    start() {
        this._socket.listen(baseinfoSvPort);
        this._socket.on('connection', this.onConnection.bind(this));
        this._socket.on('close', this.onClose.bind(this));
        this._socket.on('drain', this.onDrain.bind(this));
        this._socket.on('end', this.onEnd.bind(this));
        this._socket.on('error', this.onError.bind(this));
        this._socket.on('timeout', this.onTimeout.bind(this));
        log('net server listen on' + baseinfoSvPort);
    }
    
    onListened() {
        log('onListened');
    }
    onTimeout() {
        log('socket:timeout');
    }
    onError(e: Error) {
        log('socket error ' + e);
        this._client = null;
    }
    onEnd() {
        log('socket:end');
        this._client = null;
    }
    onDrain() {
        //write buffer empty
        log('socket:drain');
    }
    onData(data: Buffer) {
        log('socket:data ' + data.toString());
    }
    onClose() {
        log('socket:close');
        this._client = null;
    }
    onConnection(c: net.Socket) {
        log('socket:conn');
        if (this._client) {
            //只允许一个
            c.write('test server not support multi client，close now.');
            c.end();
            return;
        }
        this._client = c;
        c.on('data', this.onData.bind(this));
    }
    
    send(data:Buffer|string){
        if(this._client)
            this._client.write(data);
    }
}

export class anotherAgent{
    _getConnectData:boolean=false;
    _sv=new BaseInfoDataSv();
    _runtimeVersion:string;
    _recvData:string='';
    constructor(){
        this._sv.start();
    }
    onConnect(){
        
    }
    onClose(){
        
    }
    onEnd(){
        
    }
    onError(e:Error){
        
    }
    onData(dt:Buffer){
        //console.log('xxxxx data:'+dt);
        this._recvData+=dt.toString();
        if( !this._getConnectData){
            var pos =this._recvData.indexOf('\r\n\r\n'); 
            if( pos>0){
                this.handleConnectData(this._recvData.substr(0,pos));
                this._recvData=this._recvData.substr(pos+4);
                this._getConnectData=true;
            }
        }else{
            
        }
        //this._sv.send(dt);
    }
    handleConnectData(dt:string){
        var result = dt.match(/layabox version\: ([^\r]*)/);
        if(result.length>=2){
            this._runtimeVersion=result[1];
        }else
            this._runtimeVersion='NA';
        this._sv.send(`{"rver":"${this._runtimeVersion}"}`);
    }
    /**
     * @param msg 是一个完整的协议
     */
    handleProtocol(msg:string){
        
    }
}