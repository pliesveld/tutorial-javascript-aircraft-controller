
let system = require('./queue.js');

var passenger_small = {type: 'passenger', size: 'small'};
var passenger_large = {type: 'passenger', size: 'large'};
var cargo_small = {type: 'cargo', size: 'small'};
var cargo_large = {type: 'cargo', size: 'large'};

describe("Insertion priorities", function() {
    it("passenger large has precedence over passenger small", function() {

          system.systemBoot();
          system.enqueue(passenger_large); 
          system.enqueue(passenger_small); 

          let plane = system.dequeue();
          expect(plane.size).toEqual('large');
        });

    it("passenger large has precedence over passenger small -- reverse order", function() {

          system.systemBoot();
          system.enqueue(passenger_small); 
          system.enqueue(passenger_large); 

          let plane = system.dequeue();
          expect(plane.size).toEqual('large');
        });

    it("cargo large has precedence over cargo small", function() {

          system.systemBoot();
          system.enqueue(cargo_large); 
          system.enqueue(cargo_small); 

          let plane = system.dequeue();
          expect(plane.size).toEqual('large');
        });

    it("cargo large has precedence over cargo small -- reverse order", function() {

          system.systemBoot();
          system.enqueue(cargo_small); 
          system.enqueue(cargo_large); 

          let plane = system.dequeue();
          expect(plane.size).toEqual('large');
        });

    it("cargo large has precedence over cargo small -- reverse order", function() {

          system.systemBoot();
          system.enqueue(cargo_small); 
          system.enqueue(cargo_large); 

          let plane = system.dequeue();
          expect(plane.size).toEqual('large');
        });


    it("passenger has precedence over cargo ", function() {

          system.systemBoot();
          system.enqueue(cargo_small); 
          system.enqueue(passenger_small); 
          expect(system.dequeue().type).toEqual('passenger');

          system.systemBoot();
          system.enqueue(cargo_small); 
          system.enqueue(passenger_large); 
          expect(system.dequeue().type).toEqual('passenger');

          system.systemBoot();
          system.enqueue(passenger_large); 
          system.enqueue(cargo_small); 
          expect(system.dequeue().type).toEqual('passenger');

          system.systemBoot();
          system.enqueue(passenger_large); 
          system.enqueue(cargo_large); 
          expect(system.dequeue().type).toEqual('passenger');

          system.systemBoot();
          system.enqueue(passenger_small); 
          system.enqueue(cargo_large); 
          expect(system.dequeue().type).toEqual('passenger');

          system.systemBoot();
          system.enqueue(cargo_large); 
          system.enqueue(passenger_small); 
          expect(system.dequeue().type).toEqual('passenger');

          system.systemBoot();
          system.enqueue(cargo_large); 
          system.enqueue(passenger_large); 
          expect(system.dequeue().type).toEqual('passenger');

        });

    it("same size and type maintain FIFO order", function() {

          system.systemBoot();
          system.enqueue({type: 'cargo', size: 'large', flight: '1'});
          system.enqueue({type: 'cargo', size: 'large', flight: '2'});
          system.enqueue({type: 'cargo', size: 'large', flight: '3'});
          system.enqueue({type: 'cargo', size: 'large', flight: '4'});
          expect(system.dequeue().flight).toEqual('1');
          expect(system.dequeue().flight).toEqual('2');
          expect(system.dequeue().flight).toEqual('3');
          expect(system.dequeue().flight).toEqual('4');

          system.systemBoot();
          system.enqueue(cargo_small);
          system.enqueue({type: 'cargo', size: 'large', flight: '1'});
          system.enqueue({type: 'cargo', size: 'large', flight: '2'});
          system.enqueue({type: 'cargo', size: 'large', flight: '3'});
          system.enqueue({type: 'cargo', size: 'large', flight: '4'});
          expect(system.dequeue().flight).toEqual('1');
          expect(system.dequeue().flight).toEqual('2');
          expect(system.dequeue().flight).toEqual('3');
          expect(system.dequeue().flight).toEqual('4');
          expect(system.dequeue().size).toEqual('small');

          system.systemBoot();
          system.enqueue(passenger_small);
          system.enqueue({type: 'cargo', size: 'large', flight: '1'});
          system.enqueue({type: 'cargo', size: 'large', flight: '2'});
          system.enqueue({type: 'cargo', size: 'large', flight: '3'});
          system.enqueue({type: 'cargo', size: 'large', flight: '4'});
          expect(system.dequeue().size).toEqual('small');
          expect(system.dequeue().flight).toEqual('1');
          expect(system.dequeue().flight).toEqual('2');
          expect(system.dequeue().flight).toEqual('3');
          expect(system.dequeue().flight).toEqual('4');


        });







});


