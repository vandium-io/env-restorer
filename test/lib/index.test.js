'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const index = require( '../../lib/index' );

describe( 'lib/index', function() {

    describe( 'restore', function() {

        it( 'normal operation', function() {

            let envBefore = Object.assign( {}, process.env );

            expect( envBefore ).to.eql( process.env );

            process.env.SPECIAL_VANDIUM_IO_VALUE = 'test';
            expect( envBefore ).to.not.eql( process.env );

            index.restore();

            expect( envBefore ).to.eql( process.env );
        });
    });

    describe( 'snapshot', function() {

        it( 'normal operation', function() {

            let envBefore = Object.assign( {}, process.env );

            expect( envBefore ).to.eql( process.env );

            process.env.SPECIAL_VANDIUM_IO_VALUE1 = 'test1';
            expect( envBefore ).to.not.eql( process.env );

            let snap = index.snapshot();

            process.env.SPECIAL_VANDIUM_IO_VALUE2 = 'test2';

            snap.restore();

            expect( process.env.SPECIAL_VANDIUM_IO_VALUE2 ).to.not.exist;

            index.restore();

            expect( process.env.SPECIAL_VANDIUM_IO_VALUE1 ).to.not.exist;
        });
    });
});
