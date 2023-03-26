import { useRoutes } from 'react-router-dom';
// project import
import AuthRoutes from './Auth.route';
import DashboardRoutes from './Dashboard.route';
import NotFoundRoutes from './NotFound.route';

// ==============================|| ROUTES-APP  ||============================== //

const RoutesApp = () => useRoutes([DashboardRoutes, NotFoundRoutes, AuthRoutes]);

export default RoutesApp;
