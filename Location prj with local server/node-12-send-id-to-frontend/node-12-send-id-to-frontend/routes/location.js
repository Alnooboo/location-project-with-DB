const express = require('express');

//makes registering multiple routs easy
const router = express.Router();

//storage that keep working until the server is shuted down
const locationStorage = {
  locations: [],
};

//specify a method to support and put the posts
router.post('/add-location', (req, res, next) => {
  //the path you want to put the requests
  
  const id = Math.random();
  locationStorage.locations.push({//push the address into the array
    id: id,//make an id to the address
    address: req.body.address,//the address
    coords: { lat: req.body.lat, lng: req.body.lng }, //the address's coordinates
  });
  res.json({ message: 'Stored location!', locId: id });//sent back a message to the user
});

//specify a method to get the posts
router.get('/location/:lid', (req, res, next) => { //the /:lid tells where to start taking the id we provided
  const licationId = +req.params.lid;//we took the id and made it a number
  const location = locationStorage.locations.find(//find the address id in the array
    (loc) => loc.id === licationId
  );
  if (!location) {
    return res.status(404).json({ message: 'Not Found' });//if the id not stored return an error
  }
  res.json({ address: location.address, coordinates: location.coords });//if found return the address
});

module.exports = router; //export the router
