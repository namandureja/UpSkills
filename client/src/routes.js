import Index from 'views/Index.js';
import Profile from 'views/examples/Profile.js';
import Maps from 'views/examples/Maps.js';
import Register from 'views/examples/Register.js';
import Login from 'views/examples/Login.js';
import Tables from 'views/examples/Tables.js';
import Icons from 'views/examples/donate.js';

var routes = [
  // {
  //   path: '/index',
  //   name: 'Home',
  //   icon: 'ni ni-tv-2 text-primary',
  //   component: Index,
  //   layout: '/admin',
  // },

  {
    path: '/career',
    name: 'Career',
    icon: 'ni ni-tv-2 text-primary',
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Jobs',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/donate',
    name: 'Donate',
    icon: 'ni ni-money-coins text-pink',
    component: Icons,
    layout: '/admin',
  },
  // {
  //   path: '/career',
  //   name: 'Jobs',
  //   icon: 'ni ni-bullet-list-67 text-red',
  //   component: Career,
  //   layout: '/admin',
  // },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
  },
  // {
  //   path: '/donate',
  //   name: 'Donate',
  //   icon: 'ni ni-money-coins text-pink',
  //   component: Register,
  //   layout: '/admin',
  // },
];
export default routes;
