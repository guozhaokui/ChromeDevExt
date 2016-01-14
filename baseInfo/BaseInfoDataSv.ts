///<reference path="e:/tsdefination/node/node.d.ts" />
'use strict';
/**
 * 建立一个服务器，给调试器客户端提供一些信息。
 */
import * as net from "net";
var baseinfoSvPort = 9981;
var log = console.log;
class BaseInfoDataSv {
    _socket = net.createServer();
    _client: net.Socket = null;    //client
    constructor() {

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

    send(data: Buffer | string) {
        if (this._client)
            this._client.write(data);
    }
}


/**
 * 类似v8/http的网络协议。
 * header是一个以两个\r\n结束的数据
 * 例如
 * ....\r\n
 * Content-Length: len\r\n\r\n
 * 注意：
 * 这个是主文件，不要维护其他版本的
 */
class v8txtprot {
    static contentlenStr = 'Content-Length: ';
    _data = '';
    /**
     * 0 head
     * 1 body
     * 2 error
     */
    _state: number = 0;    
    /**
     * 接收到完整消息的处理.
     * @param prot {string} 一个完整的消息。
     */
    _onProt: (prot: string) => void;
    /**
     * 协议解析错误。
     */
    _onErr: (msg: string) => void;
    _onHeader: (head: any) => void;
    /**
     * 协议正文的期望长度
     */
    _needLen = 0;
    _header: any = null;
    constructor() { }
    wrapSendMsg(msg: string): string {
        var ret = v8txtprot.contentlenStr;
        ret += msg.length;
        ret += '\r\n\r\n';
        ret += msg;
        return ret;
    }
    /**
     * 解析header
     */
    handleHeader(dt: string): any {
        var ret = {};
        var lines = dt.split('\r\n');
        lines.forEach((v, i, arr) => {
            var d = v.split(': ');
            ret[d[0]] = d.length > 0 ? d[1] : null;
        });
        return ret;
    }
    parsedata() {
        while (true) {
            if (this._state == 0) {
                var pos = this._data.indexOf('\r\n\r\n');
                if (pos >= 0) {
                    var header = this._data.substr(0, pos);
                    this._header = this.handleHeader(header);
                    this._onHeader && this._onHeader(this._header);
                    this._needLen = parseInt(this._header['Content-Length']);
                    if (this._needLen <= 0)
                        this._state = 0;  //继续head状态
                    else if (isNaN(this._needLen)) {
                        this._onErr && this._onErr('content lenth error!' + header);
                        this._state = 3;
                    } else {
                        this._state = 1;
                    }
                    this._data = this._data.substr(pos + 4);
                } else {
                    break;//终止while
                }
            }
            else if (this._state == 1) {
                if (this._data.length >= this._needLen) {
                    this._onProt && this._onProt(this._data.substr(0, this._needLen));
                    this._data = this._data.substr(this._needLen);
                    this._state = 0;
                } else {
                    break;//终止while
                }
            } else {
                //err 不知道怎么处理
                this._data = '';
                this._state = 0;
                break;
            }
        }
    }
    onData(dt: string) {
        this._data += dt;
        this.parsedata();
    }
}

/**
 * NI的网络消息也要发给这个对象，这个对象在分析后，传给调试器客户端
 * 
 */
export class anotherAgent {
    _firstHeader = true;
    _sv = new BaseInfoDataSv();
    _prot = new v8txtprot();
    _runtimeVersion: string;
    constructor() {
        this._prot._onProt = this.handleProtocol.bind(this);
        this._prot._onErr = this.handleProtError.bind(this);
        this._prot._onHeader = this.handleHeader.bind(this);
        this._sv.start();
    }
    onConnect() {
        //NI与runtime建立连接了
        this._sv.send('');
    }
    onClose() {
        //NI与runtime断开了
    }
    onEnd() {
        //NI与runtime断开了
    }
    onError(e: Error) {
        //NI与runtime断开了
    }
    onData(dt: Buffer) {
        //console.log('xxxxx data:'+dt);
        this._prot.onData(dt.toString());
    }

    send2C(msg: string) {
        this._sv.send(this._prot.wrapSendMsg(msg));
    }
    handleHeader(head: any) {
        if (this._firstHeader) {
            var layaver = head['layabox version'];
            layaver = layaver ? layaver : 'NA';
            this.send2C(`{"type":"baseinfo","rver":"${layaver}"}`);
            this._firstHeader = false;
        }
    }
    handleProtError(dt: string) {
        console.log(dt);
    }
    /**
     * @param msg 是一个完整的协议
     */
    handleProtocol(msg: string) {

    }
}