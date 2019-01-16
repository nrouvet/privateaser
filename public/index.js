'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(bars);
//console.log(events);
//console.log(actors);


function GetBarId(id) {
  var barFound = false;
  var i = 0;
  var result = null;
  while (barFound == false && i < bars.length) {
    if (id == bars[i].id) {
      barFound = true;
      result = bars[i];
    }
    i = i + 1;
  }
  return result;
}

function generateBookingPrice() {
  for (var i = 0; i < events.length; i++) {
    var bar = GetBarId(events[i].barId);
    if (bar != null) {
      events[i].price = events[i].time * bar.pricePerHour + events[i].persons * bar.pricePerPerson  ;
      //var commission = events[i].price*0.7 - deductile(i);
      if (events.persons > 10 && events.persons < 20) {
        events[i].price = price * 0.90;
      }
      if (events.person > 20 && events.persons < 60) {
        events[i].price = price * 0.70;
      }
      if (events.person > 60) {
        events[i].price = price * 0.50;
      }
      else { }
      var commission = 0.3 * events[i].price;
      events[i].commission.insurance = commission * 0.5;
      events[i].commission.treasury = events[i].persons;
      events[i].commission.privateaser = commission - (events[i].commission.insurance + events[i].commission.treasury) ;

    }

  }
}



/*function GetBarId(event){
  return bars.find(function(bar){
    if(bar.id === id){
      return true
    }
    return false;
  })
}*/


function deductile(index) {
  var deductibleReduction = 0;
  if (events[index].options.deductibleReduction === true) {
    deductibleReduction = events[index].commission.treasury;
  }
  else {
  }
  return deductibleReduction;
}


function GetEventId(id) {
  return events.find(function (event) {
    if (event.id === id) {
      return true
    }
    return false;
  })
}


function payActor() {
  for (var i = 0; i < actors.length; i++) {
    var event = GetEventId(actors[i].eventId);
    if (event != null) {
      for (var j = 0; j < actors[i].payment.length; j++) {
        switch (actors[i].payment[j].who) {
          case 'booker':
            actors[i].payment[j].amount = event.price +deductile(i);
            break;
          case 'bar':
            actors[i].payment[j].amount = event.price * 0.7;
            break;
          case 'insurance':
            actors[i].payment[j].amount = event.commission.insurance;
            break;

          case 'treasury':
            actors[i].payment[j].amount = event.commission.treasury;
            break;

          case 'privateaser':
            actors[i].payment[j].amount = event.commission.privateaser+deductile(i);

        }
      }
    }
  }
}

generateBookingPrice();
payActor();
console.log(events);
console.log(actors);



//const getBar = id => bars.find(bar =>bar.id ===id );
// step 4

