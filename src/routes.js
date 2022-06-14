import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Tasks from "./pages/Tasks";

// ----------------------------------------------------------------------

export default function Router(props) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout user={props.authReducer}/>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'tasks', element: <Tasks applicationReducer={props.applicationReducer}/> },
        { path: 'products', element: <Products applicationReducer={props.applicationReducer}/> },
        { path: 'blog', element: <Calendar /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate  to={props.authReducer.isLoggedIn !== true ? '/login' : '/dashboard/app'} /> },
        { path: '/login', element: <Navigate  to={props.authReducer.isLoggedIn !== true ? '/login' : '/dashboard/app'} /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
