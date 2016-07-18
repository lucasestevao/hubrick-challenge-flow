(function () {

'use strict';

var nextRuleId = 1,
    fs = require('fs'),
    fileRules = fs.readFileSync( 'rules.json' );

var flowEngine = {

    rulesObj: undefined,

    rulesList: undefined,

    start: function() {
        this.rulesObj = JSON.parse( fileRules );
        
        this.rulesList = this.process( this.rulesObj );

        console.log( '\x1b[36m%s\x1b[0m', '[START] Fasten Your Seat Belts... Starting to run the engine...' );

        this.run();
    },

    process: function( rules ) {
        var listOfRules = {};

        rules.forEach( ( rule ) => {
            listOfRules[ rule.id ] = rule;
        } );

        return listOfRules;
    },

    run: function() {
        var ruleToBeExecuted, result;

        while( nextRuleId !== null ) {
            ruleToBeExecuted = this.rulesList[ nextRuleId ].rule;
            result = ( new Function( 'param', ruleToBeExecuted ) )( 1 );

            if( result ) {
                this.logSuccess( nextRuleId );
                nextRuleId = this.rulesList[ nextRuleId ].true_id;
            } else {
                this.logFailure( nextRuleId );
                nextRuleId = this.rulesList[ nextRuleId ].false_id;
            }
        }

        console.log( '\x1b[36m%s\x1b[0m', `[END] Ladies and gentlemen, welcome to your destination. Local time is ${new Date()} and the temperature is warm enough.` );
    },

    logFailure: function( info ) {
        console.log( '\x1b[31m%s\x1b[0m', `RULE ID: ${info} - FAILED!` );
    },

    logSuccess: function( info ) {
        console.log( '\x1b[32m%s\x1b[0m', `RULE ID: ${info} - PASSED!` );
    }

};

module.exports = flowEngine;

flowEngine.start();

}());


/*

NOTES:

- The solution is as simple as possible (built in less the 3 hours), hence, you won't see validation methods to guarantee
that the JSON and its attributes are valid accordign to the expectations. Also, I'm not considering a huge file, otherwise
I wouldn't allocate everything on memory and would use something like merge sort to handle it.

- It was build in a way that the engine will only end after every rule pass, following a flow. If I didn't want this behavior,
I could have created an object to store the previous ids, avoiding circular reference.

- We could have only one method for logs, but I believe it was better having two methods (easier to understand the code in a 
glimpse), as this is not a production solution.

- I'm using ES6 for arrow functions, template literal syntax and stuff, and also a recent version of Node (it can be an issue).

*/