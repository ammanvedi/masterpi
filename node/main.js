

( function( prompt, pb, keypress, debounce ) {

    var schema = {
        properties: {
            command: {
                pattern: /^drive|steer`\s[0-7]{1}\s(forward|reverse)?/,
                message: 'Command not recognised !!',
                required: true
            }
        }
    };

    var processCommand = function() {

        keypress( process.stdin );
        var power = 0;
        var steer = 0;

        var onkeyPress = function( ch, key ) {
            console.log( 'keypress' )

            power = Math.max( -7, power );
            power = Math.min( 7, power );
            steer = Math.max( -7, steer );
            steer = Math.min( 7, steer );

            

            switch( key.name ) {
                case "up":
                    vehicle.drive( Math.abs( ++power ), power >= 0 ? 'FORWARD' : 'REVERSE' );
                    break;
                case "down":
                    vehicle.drive( Math.abs( --power ), power >= 0 ? 'FORWARD' : 'REVERSE' );
                    break;
                case "left":
                    vehicle.steer( Math.abs( ++steer ), steer >= 0 ? 'FORWARD' : 'REVERSE' );
                    break;
                case "right":
                    vehicle.steer( Math.abs( --steer ), steer >= 0 ? 'FORWARD' : 'REVERSE' );
                    break;
            }

            console.log( power )
        }

        process.stdin.on( 'keypress', debounce( onkeyPress, 500 ) );

        process.stdin.setRawMode(true);
        process.stdin.resume();


    }

    var vehicle = new piBot.Vehicle( processCommand.bind( this ) );

} )( require('prompt'), piBot, require('keypress'), require( 'debounce' ) );