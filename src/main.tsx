import { signout } from '@core/login/signout';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ErrorBoundary } from '@ui/error-bound';
import { theme } from '@ui/theme';
import { StrictMode } from 'react';
import 'react-base-table/styles.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { ErrorPage } from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@routes/root'),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        lazy: () => import('@routes/home'),
      },
      {
        path: 'priceme',
        children: [
          {
            path: 'users',
            lazy: () => import('@routes/priceme-users'),
          },
          {
            path: 'users/:userId',
            lazy: () => import('@routes/priceme-users/edit/UserPage'),
          },
          {
            path: 'users/:userId/edit',
            lazy: () => import('@routes/priceme-users/edit/UserEditPage'),
          },
          {
            path: 'tasks',
            lazy: () => import('@routes/priceme-tasks'),
          },
          {
            path: 'tasks/:taskId/edit',
            lazy: () => import('@routes/priceme-tasks/edit'),
          },
          {
            path: 'tasks/create',
            lazy: () => import('@routes/priceme-tasks/create'),
          },
          {
            path: 'boosts',
            lazy: () => import('@routes/priceme-boosts'),
          },
          {
            path: 'boosts/:boostId/edit',
            lazy: () => import('@routes/priceme-boosts/edit'),
          },
          {
            path: 'boosts/create',
            lazy: () => import('@routes/priceme-boosts/create'),
          },
        ],
      },

      {
        path: 'dashboard',
        lazy: () => import('@routes/dashboard'),
      },

      {
        path: 'users',
        lazy: () => import('@routes/users'),
      },
      {
        path: 'users/:userId',
        lazy: () => import('@routes/users/edit/UserPage'),
      },
      {
        path: 'users/:userId/edit',
        lazy: () => import('@routes/users/edit/UserEditPage'),
      },
      {
        path: 'config',
        lazy: () => import('@routes/config'),
      },
      {
        path: 'config/create',
        lazy: () => import('@routes/config/create'),
      },
      {
        path: 'config/edit',
        lazy: () => import('@routes/config/edit'),
      },
      {
        path: 'achievements',
        lazy: () => import('@routes/achievements'),
      },
      {
        path: 'achievements/:aId/edit',
        lazy: () => import('@routes/achievements/edit'),
      },
      {
        path: 'achievements/create',
        lazy: () => import('@routes/achievements/create'),
      },
      {
        path: 'tasks',
        lazy: () => import('@routes/tasks'),
      },
      {
        path: 'tasks/:taskId/edit',
        lazy: () => import('@routes/tasks/edit'),
      },
      {
        path: 'tasks/create',
        lazy: () => import('@routes/tasks/create'),
      },

      {
        path: 'specials',
        lazy: () => import('@routes/specials'),
      },
      {
        path: 'specials/:specialId/edit',
        lazy: () => import('@routes/specials/edit'),
      },
      {
        path: 'specials/create',
        lazy: () => import('@routes/specials/create'),
      },
      {
        path: 'markets',
        lazy: () => import('@routes/markets'),
      },
      {
        path: 'markets/:marketId/edit',
        lazy: () => import('@routes/markets/edit'),
      },
      {
        path: 'markets/create',
        lazy: () => import('@routes/markets/create'),
      },
      {
        path: 'markets/:marketId/lvls',
        lazy: () => import('@routes/market-lvls'),
      },
      {
        path: 'markets/:marketId/lvls/:lvlId/edit',
        lazy: () => import('@routes/market-lvls/edit'),
      },
      {
        path: 'markets/:marketId/lvls/create',
        lazy: () => import('@routes/market-lvls/create'),
      },
      {
        path: 'upgrades',
        lazy: () => import('@routes/upgrades'),
      },
      {
        path: 'upgrades/:upgradeId/edit',
        lazy: () => import('@routes/upgrades/edit'),
      },
      {
        path: 'upgrades/create',
        lazy: () => import('@routes/upgrades/create'),
      },
      {
        path: 'upgrades/:upgradeId/lvls',
        lazy: () => import('@routes/upgrade-lvls'),
      },
      {
        path: 'upgrades/:upgradeId/lvls/:lvlId/edit',
        lazy: () => import('@routes/upgrade-lvls/edit'),
      },
      {
        path: 'upgrades/:upgradeId/lvls/create',
        lazy: () => import('@routes/upgrade-lvls/create'),
      },
      {
        path: 'boosts',
        lazy: () => import('@routes/boosts'),
      },
      {
        path: 'boosts/:boostId/edit',
        lazy: () => import('@routes/boosts/edit'),
      },
      {
        path: 'boosts/create',
        lazy: () => import('@routes/boosts/create'),
      },
      {
        path: 'crash-games',
        lazy: () => import('@routes/crash'),
      },
      {
        path: 'crash-games/:gameId',
        lazy: () => import('@routes/crash/detail'),
      },
    ],
  },
  {
    path: '/login',
    lazy: () => import('@routes/login'),
  },
  {
    path: '/logout',
    async action() {
      signout();
      return redirect('/login');
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
