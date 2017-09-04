const os = require('os');
const crypto = require('crypto');

const DEFAULT_OPTIONS = {
    prefix: '',
    hash: false,    
    radix: 36
};

class IDGenerator {
    constructor(options = {}) {        
        options = Object.assign({}, DEFAULT_OPTIONS, options); 
        this._prefix = options.prefix || '';
        this._hash = options.hash;
        this._radix = options.radix;
    }

    generate() {
        const prefix = this._prefix;
        const mac = this._getMAC().toString(this._radix);
        const pid = process.pid.toString(this._radix);
        const ts = Date.now().toString(this._radix);
        const rand = Math.floor(10000 * Math.random()).toString(this._radix);
        const id = `${prefix}${mac}${pid}${ts}${rand}`;

        return this._hash ? crypto.createHash('sha1').update(id).digest('hex') : id;
    }

    _getMAC() {
        if(this.mac !== undefined) {
            return this.mac;
        }
        
        const networkInterfaces = os.networkInterfaces();        
        let firstExternal;
        for(let iface in networkInterfaces) {
            if(networkInterfaces.hasOwnProperty(iface)) {
                const networkInterface = networkInterfaces[iface];
                if(networkInterface && networkInterface.length > 0 && !networkInterface[0].internal) {
                    firstExternal = networkInterfaces[iface];
                    break;
                }
            }
        }        

        if(firstExternal && firstExternal.length > 0) {
            this.mac = parseInt(firstExternal[0].mac.replace(/\:/g, ''), 16);
        }
        else {
            this.mac = 0;            
        }
        return this.mac;
    }
}

module.exports = IDGenerator;