( function( ssh, fs, config, pb ) {

    pb.piSSHConnector = function( success ) {
        var _self = this;

        _self.config = false;
        _self.success = success;

        _self.connection = false;
        _self.connect();

    }

    pb.piSSHConnector.prototype.sendCommand = function( command ) {
        var _self = this;

        if( _self.connection ) {
            _self.connection.exec( command );
        }
    }

    pb.piSSHConnector.prototype.connect = function() {
        var _self = this;

        var configs = config.ssh.host.map( function( ipAddr ) {
            var newCfg = Object.assign( {}, config.ssh );
            newCfg.host = ipAddr;
            return newCfg;
        } );

        pb.util.asyncLoop( function( index, done ) {
            // dont hate me for this 
            var __self = _self;

            var cfg = configs[ index ];
 
            var candidateInstance = new ssh( {
                ignoreErrors: false,
                sshConfig: cfg
            } ); 

            var conn = candidateInstance.exec( 'ls', './ssh.log' )
            candidateInstance.on( 'error', function( e ) {
                console.log( 'ssh: failed for IP ', cfg.host );
                done();
            } );
            conn.on( 'ssh2Data', function( e ) {
                console.log( 'ssh: succeded for IP ', cfg.host );
                __self.connection = candidateInstance;
                done( true );
            } );

        }, configs.length, _self.success );

    }


} )( require( 'gulp-ssh' ), require( 'fs' ), require( './config.pi.js' ), piBot );




