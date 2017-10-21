
/**
 * the goal of this module is to provide useful methods for generating 
 * irsend commands targeted at a technic IR reciever 
 * 
 * consult the source for an example irsend configuration that this project
 * uses.
 */

( function( pb, config ) {

    pb.TECHNIC_IR = {};

    pb.TECHNIC_IR.CHANNEL = {
        ONE     : "1", TWO     : "2",
        THREE   : "3", FOUR    : "4"
    };

    pb.TECHNIC_IR.OUTPUT = {
        BLUE    : "B", RED     : "R"
    }

    pb.TECHNIC_IR.DIRECTION = {
        FORWARD : "F", REVERSE : "R"
    }

    pb.TECHNIC_IR.POWER_LEVEL = {
        1     : "1", 2    : "2",
        3     : "3", 4    : "4",
        5     : "5", 6    : "6",
        7     : "7", 0    : "0"
    }

    pb.technicIr = function( channel, output ) {
        var _self = this;

        _self.channel = channel;
        _self.output = output;

    }

    pb.technicIr.prototype.command = function( power, direction ) {
        var _self = this;

        var command = "irsend SEND_ONCE ";
        command += config.irDeviceName + " ";
        command += _self.channel;
        command += _self.output + "_";
        command += direction ===  pb.TECHNIC_IR.DIRECTION.FORWARD ? "" : "M";
        command += power;

        return command;

    }


} )( piBot, require( './config.pi.js' ) );




