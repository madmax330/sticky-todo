import Dashboard from 'views/Todo/Dashboard.jsx';
import History from 'views/Todo/History.jsx';
import Profile from 'views/Todo/Profile.jsx';

import Dash from '@material-ui/icons/Dashboard';
import Clock from '@material-ui/icons/History';
import Person from '@material-ui/icons/Person';

const todoRoutes = [
    {
        path: '/todo/dashboard',
        name: 'Dashboard',
        icon: Dash,
        component: Dashboard,
        layout: '/'
    },
    {
        path: '/todo/history',
        name: 'History',
        icon: Clock,
        component: History,
        layout: '/'
    },
    {
        path: '/todo/profile',
        name: 'Profile',
        icon: Person,
        component: Profile,
        layout: '/'
    },
    { redirect: true, path: "/todo", pathTo: '/todo/dashboard', name: 'Dashboard' }
];

export default todoRoutes;
