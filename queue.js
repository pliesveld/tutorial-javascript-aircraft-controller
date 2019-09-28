

var system = function() {

  var _queue;


  return {
    systemBoot: function() {
      _queue = [];
    },


    enqueue: function(aircraft) {

      var type = aircraft.type;
      var size = aircraft.size;

      if(_queue.length === 0) {
        _queue.push(aircraft);
      } else {

        var i;
        for(i = 0; i < _queue.length; i++) {
          var t_aircraft = _queue[i];
          var t_type = _queue[i].type;
          var t_size = _queue[i].size;

          if( (type === 'passenger' && t_type === 'cargo') 
              || (
                type === t_type && size !== t_size && size === 'large'
                )) {
              break;
            }
        }

        if(i === _queue.length) {
          _queue.push(aircraft);
        } else {
          _queue.splice(i, 0, aircraft);
        }

      }
      this.updateQueueView();

    },

    /*
      passenger.small
      passenger.large
      cargo.small
      cargo.large


      precedence rules.  higher value has priority:

        passenger.* > cargo.*
        passenger.large > passenger.small
        cargo.large > cargo.small

        ACs of same type and size maintain FIFO order relative to each other
    */
    dequeue: function() {
      var aircraft = _queue.shift();
      this.updateQueueView();
      return aircraft;
    },

    updateQueueViewEntry: function(aircraft) {
      var type = aircraft.type;
      var size = aircraft.size;
      var ele = $('<li>' + type + ' ' + size + '</li>');
      $('#queue').append(ele);
    },

    updateQueueView: function () {
      // console.log(_queue);
      if(typeof $ !== 'undefined') {
        $('#queue').empty();
        _queue.forEach(this.updateQueueViewEntry);
      }
    }
  };

}();


module.exports = system;