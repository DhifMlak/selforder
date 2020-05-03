import { RouteInfo } from '../sidebar/sidebar.component';

export const NAV_ROUTES: RouteInfo[] = [
    { path: '/menu/overview', title: 'Overview',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/menu/menus', title: 'Menus',  icon:'ni-planet text-blue', class: '' },
    { path: '/menu/categories', title: 'Categories',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/menu/items', title: 'Items',  icon:'ni-single-02 text-yellow', class: '' },
    /* { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }, */
    { path: '/menu/modifer-groups', title: 'Modifier Groups',  icon:'ni-circle-08 text-pink', class: '' }

];
