const express = require('express');
const router = express.Router();
const path = require('path');
const { Place, Hotel, Restaurant, Activity } = require('../models');

router.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

router.get('/api', (req, res, next) => {

  const hotels = Hotel.findAll({
    include: [Place]
  });

  const restaurants = Restaurant.findAll({
    include: [Place]
  });

  const activities = Activity.findAll({
    include: [Place]
  });

  Promise.all([hotels, restaurants, activities])
  .then(values => {
    res.json(values);
  });
});

router.get('/api/hotels', (req, res, next) => {
  const hotels = Hotel.findAll({
    include: [Place]
  })
  .then(hotels => {
    res.json(hotels);
  });
});

router.get('/api/restaurants', (req, res, next) => {
  const restaurants = Restaurant.findAll({
    include: [Place]
  })
  .then(restaurants => {
    res.json(restaurants);
  });
});

router.get('/api/activities', (req, res, next) => {
  const activities = Activity.findAll({
    include: [Place]
  })
  .then(activities => {
    res.json(activities);
  });
});

module.exports = router;
