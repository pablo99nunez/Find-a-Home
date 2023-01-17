const express = require('express');
const userRoute = require('./user.route');



const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/pet',
    route: userRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
