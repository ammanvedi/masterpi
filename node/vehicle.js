
/**
 * the goal of this module is to provide useful methods for generating 
 * irsend commands targeted at a technic IR reciever 
 * 
 * consult the source for an example irsend configuration that this project
 * uses.
 */

( function( pb, config ) {

    pb.Vehicle = function( connectedCallback ) {
        var _self = this;

        _self.connected = false;
        _self.connectedCallback = connectedCallback;
        _self.steering = new pb.technicIr( pb.TECHNIC_IR.CHANNEL.ONE, pb.TECHNIC_IR.OUTPUT.RED );
        _self.driver = new pb.technicIr( pb.TECHNIC_IR.CHANNEL.ONE, pb.TECHNIC_IR.OUTPUT.BLUE );
        _self.vehicleCommander = new pb.piSSHConnector( _self.didConnect.bind( _self ) );


    }

    pb.Vehicle.prototype.didConnect = function() {
        var _self = this;
        _self.connected = true;

        //var cmd = _self.drive.command( pb.TECHNIC_IR.POWER_LEVEL.FOUR, pb.TECHNIC_IR.DIRECTION.FORWARD );
        //console.log( 'CMD', cmd );
        //_self.vehicleCommander.sendCommand( cmd );
        _self.connectedCallback();
    }

    pb.Vehicle.prototype.isConnected = function() {
        var _self = this;

        return _self.connected();
    }

    pb.Vehicle.prototype.steer = function( position, direction ){
        var _self = this;
        var cmd = _self.steering.command(  pb.TECHNIC_IR.POWER_LEVEL[ position ] || pb.TECHNIC_IR.POWER_LEVEL[ 0 ], 
                                        pb.TECHNIC_IR.DIRECTION[ direction ] || pb.TECHNIC_IR.DIRECTION.FORWARD );
        console.log( 'CMD', cmd );
        _self.vehicleCommander.sendCommand( cmd );
    }

    pb.Vehicle.prototype.drive = function( power, direction ){
        var _self = this;
        var cmd = _self.driver.command(  pb.TECHNIC_IR.POWER_LEVEL[ power ] || pb.TECHNIC_IR.POWER_LEVEL.ZERO, 
                                        pb.TECHNIC_IR.DIRECTION[ direction ] || pb.TECHNIC_IR.DIRECTION.FORWARD );
        console.log( 'CMD', cmd );
        _self.vehicleCommander.sendCommand( cmd );
    }


} )( piBot, require( './config.pi.js' ) );




