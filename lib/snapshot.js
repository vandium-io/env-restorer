'use strict';

class EnvVarSnapshot {

    constructor() {

        this._snapshot = Object.assign( {}, process.env );
    }

    restore() {

        // update or remove
        for( let key in process.env ) {

            let snapshotValue = this._snapshot[ key ];

            if( (snapshotValue !== undefined) && (process.env[ key ] !== snapshotValue) ) {

                process.env[ key ] = snapshotValue;
            }
            else {

                delete process.env[ key ];
            }
        }

        // add missing
        for( let key in this._snapshot ) {

            if( process.env[ key ] === undefined ) {

                process.env[ key ] = this._snapshot[ key ];
            }
        }
    }
}

module.exports = EnvVarSnapshot;
