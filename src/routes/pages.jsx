import Login from 'views/Pages/Login.jsx';
import Register from 'views/Pages/Register.jsx';
import Terms from 'views/Pages/Terms.jsx';
import Privacy from 'views/Pages/Privacy.jsx';

import Lock from '@material-ui/icons/LockOpenOutlined';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Pages from '@material-ui/icons/Pages';
import Web from '@material-ui/icons/Web';

const pageRoutes = [
    {
        path: '/login',
        name: 'Login',
        icon: Lock,
        component: Login,
        layout: '/'
    },
    {
        path: '/signup',
        name: 'Sign Up',
        icon: PersonAdd,
        component: Register,
        layout: '/'
    },
    {
        path: '/terms',
        name: 'Terms & Conditions',
        icon: Pages,
        component: Terms,
        layout: '/'
    },
    {
        path: '/privacy',
        name: 'Privacy Policy',
        icon: Web,
        component: Privacy,
        layout: '/'
    },
    { redirect: true, path: "/", pathTo: '/login', name: 'Index'}
];

export default pageRoutes;
