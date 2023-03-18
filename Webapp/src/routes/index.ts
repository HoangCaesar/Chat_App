import { useRoutes } from 'react-router-dom';
// project import
import DashboardRoutes from './Dashboard.route';
import NotFoundRoutes from './NotFound.route';
import AuthRoutes from './Auth.route';

// ==============================|| ROUTES-APP  ||============================== //

const RoutesApp = () => useRoutes([DashboardRoutes, NotFoundRoutes, AuthRoutes]);

export default RoutesApp;
