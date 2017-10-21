
( function( pbu ) {

    pbu.asyncLoop = function( loopFunction, limit, success ) {

        // loop from 0
        var index = 0;


        var doneCallback = function( breakNow ) {

            if( !breakNow && ( index++ < limit ) ) {
                loopFunction( index, doneCallback );
                return false;
            }
            // return conditions
            success();
        }

        loopFunction( index, doneCallback );

}

} )( piBot.util );

