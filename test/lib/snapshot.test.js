'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const EnvVarSnapshot = require( '../../lib/snapshot' );

describe( 'lib/snapshot', function() {

    describe( 'EnvVarSnapshot', function() {

        describe( 'construct', function() {

            it( 'normal operation', function() {

                let snapshot = new EnvVarSnapshot();

                expect( snapshot._snapshot ).to.not.equal( process.env );
                expect( snapshot._snapshot ).to.eql( process.env );
            });
        });

        describe( 'restore', function() {

            afterEach( function() {

                delete process.env.SPECIAL_VANDIUM_IO_VALUE;
            });

            it( 'no changes to env vars', function() {

                let snapshot = new EnvVarSnapshot();

                let envBefore = Object.assign( {}, process.env );

                snapshot.restore();
                expect( envBefore ).to.eql( process.env );
            });

            it( 'no changes, call restore() multiple times', function() {

                let snapshot = new EnvVarSnapshot();

                let envBefore = Object.assign( {}, process.env );

                snapshot.restore();
                expect( envBefore ).to.eql( process.env );

                snapshot.restore();
                expect( envBefore ).to.eql( process.env );
            });

            it( 'new env var', function() {

                let snapshot = new EnvVarSnapshot();

                let envBefore = Object.assign( {}, process.env );

                expect( envBefore ).to.eql( process.env );

                process.env.SPECIAL_VANDIUM_IO_VALUE = 'test';
                expect( envBefore ).to.not.eql( process.env );

                snapshot.restore();
                expect( envBefore ).to.eql( process.env );
            });

            it( 'remove env var', function() {

                process.env.SPECIAL_VANDIUM_IO_VALUE = 'test';

                let snapshot = new EnvVarSnapshot();

                let envBefore = Object.assign( {}, process.env );

                expect( envBefore ).to.eql( process.env );

                delete process.env.SPECIAL_VANDIUM_IO_VALUE;
                expect( envBefore ).to.not.eql( process.env );

                snapshot.restore();
                expect( envBefore ).to.eql( process.env );
                expect( process.env.SPECIAL_VANDIUM_IO_VALUE ).to.exist;
            });

            it( 'update env var', function() {

                process.env.SPECIAL_VANDIUM_IO_VALUE = 'test';

                let snapshot = new EnvVarSnapshot();

                let envBefore = Object.assign( {}, process.env );

                expect( envBefore ).to.eql( process.env );

                process.env.SPECIAL_VANDIUM_IO_VALUE = 'testing';

                expect( envBefore ).to.not.eql( process.env );

                snapshot.restore();
                expect( envBefore ).to.eql( process.env );
                expect( process.env.SPECIAL_VANDIUM_IO_VALUE ).to.equal( 'test' );
            });
        });
    });
});
