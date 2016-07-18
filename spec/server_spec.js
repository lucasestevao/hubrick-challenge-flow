'use strict'

var engine = require( '../server/server' );

describe( 'The Flow Engine', function () {

    it( 'should define an object from a JSON', function() {
        engine.start();

        expect( typeof engine.rulesObj ).toEqual( 'object' );

        expect( typeof engine.rulesList ).toEqual( 'object' );
    } );

    it( 'should have a process function and it should return an object', function () {
        var result = engine.process( [{ id: '1' }] );

        expect( typeof engine.process ).toEqual( 'function' );

        expect( typeof result ).toEqual( 'object' );

        expect( result[1].id ).toBe( '1' );
    } );

    it( 'should call process and run functions, rulesObj and rulesList should be defined', function () {
        spyOn( engine, 'process' ).and.callThrough();
        spyOn( engine, 'run' ).and.callThrough();
        spyOn( engine, 'logSuccess' ).and.callThrough();

        engine.start();

        expect( engine.rulesObj ).toBeDefined();
        expect( engine.rulesList ).toBeDefined();

        expect( engine.process ).toHaveBeenCalled();
        expect( engine.run ).toHaveBeenCalled();
        expect( engine.logSuccess ).toHaveBeenCalled();
    } );

    it( 'should have log functions', function () {
        expect( typeof engine.logFailure ).toEqual( 'function' );

        expect( typeof engine.logSuccess ).toEqual( 'function' );
    } );

});