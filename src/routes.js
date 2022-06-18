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
import Projects from "./pages/Projects";

// ----------------------------------------------------------------------

export default function Router(props) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout user={props.authReducer}/>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'projects', element: <Projects applicationReducer={props.applicationReducer}/> },
        { path: 'products', element: <Products applicationReducer={props.applicationReducer}/> },
        { path: 'blog', element: <Calendar applicationReducer={props.applicationReducer} authReducer={props.authReducer}/> },
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
