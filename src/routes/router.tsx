import { Navigate, RouterProvider, createBrowserRouter } from 'react-router';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { Paths } from './paths';
import RegisterPage from '../pages/RegisterPage';
import DayTripsPage from '../pages/DayTripsPage';
import TripDetailsPage from '../pages/TripDetailsPage';
import AuthGuard from '../auth/AuthGuard';
import PersonalArea from '../pages/PersonalArea';
import TripPlannerWizard from '../pages/TripPlannerWizard';
import PlanningResultPage from '../pages/PlanningResultPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import AdminDashboard from '../pages/AdminDashboardPage';
import AdminLayout from '../layouts/AdminLayout';
import AdminGuard from '../auth/AdminGuard';
import AdminAllTripsPage from '../pages/AdminAllTripsPage';
import AdminPendingTripsPage from '../pages/AdminPendingTripsPage';
import AdminPlacesPage from '../pages/AdminPlacesPage';
import AdminUsersPage from '../pages/AdminUsersPage';
import BuildTripPage from '../pages/BuildTripPage';
import MyTripsPage from '../pages/MyTripsPage';

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to={Paths.home} replace />,
        },
        {
          path: Paths.home,
          element: <HomePage />,
        },
        {
          path: Paths.trips,
          element: <DayTripsPage />,
        },
        {
          path: Paths.tripsDetail,
          element: <TripDetailsPage />,
        },
        {
          path: Paths.user,
          element: <AuthGuard><PersonalArea /></AuthGuard>,
        },
        {
          path: Paths.myTrips,
          element: <AuthGuard><MyTripsPage /></AuthGuard>,
        },
        {
          path: Paths.tripPlan,
          element: <TripPlannerWizard />,
        },
        {
          path: Paths.planningResultPage,
          element: <PlanningResultPage />,
        },
        {
          path: Paths.about,
          element: <AboutPage />,
        },
        {
          path: Paths.contact,
          element: <ContactPage />,
        },
        {
          path: '/' + Paths.buildTrip,
          element: <BuildTripPage />,
        },
        {
          path: '/' + Paths.buildTripById,
          element: <BuildTripPage />,
        },
      ],
    },
    {
      path: Paths.admin,
      element: (
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      ),
      children: [
        {
          path: Paths.adminDashboard,
          element: <AdminDashboard />,
        },
        {
          path: Paths.adminTrips,
          element: <AdminAllTripsPage/>,
        },
        {
          path: Paths.adminTripsPending,
          element: <AdminPendingTripsPage />,
        },
        {
          path: Paths.adminPlaces,
          element: <AdminPlacesPage />,
        },
        {
          path: Paths.adminUsers,
          element: <AdminUsersPage />,
        },
        {
          path: Paths.tripsDetail,
          element: <TripDetailsPage />,
        },
      ],
    },
    {
      path: Paths.login,
      element: <LoginPage />,
    },
    {
      path: Paths.register,
      element: <RegisterPage />,
    },
    {
      path: '*',
      element: <h1>404 Page not found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
