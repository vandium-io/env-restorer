'use strict';

const EnvVarSnapshot = require( './snapshot' );

function snapshot() {

    return new EnvVarSnapshot();
}

const snapshotFromLoad =  snapshot();

function restore() {

    snapshotFromLoad.restore();
}

module.exports = {

    snapshot,

    restore,
}
