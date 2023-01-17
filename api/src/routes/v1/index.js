const express = require('express');
//const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const adminRoute = require('./admin.route');
const anyRoute = require('./any.route');
const superadminRoute = require('./superadmin.route')
//const docsRoute = require('./docs.route');
//const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/any',
    route: anyRoute,
  },
  {
    path: '/superadmin',
    route: superadminRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
/* if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
} */

module.exports = router;
