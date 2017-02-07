var onConnect = function() {
    console.log( 'instance', c.connection );
}

var c = new piBot.ssh( onConnect.bind( this ) );

