import { LS, LSKeys } from '@core/local-store';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import SettingsIcon from '@mui/icons-material/Settings';
import StarsIcon from '@mui/icons-material/Stars';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TaskIcon from '@mui/icons-material/Task';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
} from '@mui/material';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { LoaderFunctionArgs, Outlet, redirect, useFetcher } from 'react-router-dom';
import { $token } from '../core/login/store';
import { $snacks, closeSnack } from '../core/snacks/store';

export const Component = () => {
  const [open, setOpen] = useState(false);
  const hasToken = !!useUnit($token);
  const snacksStore = useUnit($snacks);
  const fetcher = useFetcher();

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={hasToken ? openMenu : undefined}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {hasToken && (
              <fetcher.Form method="post" action="/logout" style={{ marginLeft: 'auto' }}>
                <Button type="submit" variant="contained" color="secondary">
                  Logout
                </Button>
              </fetcher.Form>
            )}
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={closeMenu}>
          <Box sx={{ width: 250 }} role="presentation" onClick={closeMenu}>
            <List>
              <Link href="/" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Главная" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/users" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Пользователи ducky" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/priceme/users" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Пользователи priceme" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/config" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Конфиг" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/achievements" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <VerifiedUserIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ачивки" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/tasks" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TaskIcon />
                    </ListItemIcon>
                    <ListItemText primary="Задачи ducky" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="/priceme/tasks" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TaskIcon />
                    </ListItemIcon>
                    <ListItemText primary="Задачи priceme" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/specials" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StarsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Special" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/markets" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary="Маркет" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/upgrades" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PlusOneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Апгрейд" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/boosts" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <UpgradeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ducky boost" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="/priceme/boosts" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <UpgradeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Priceme boost" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/crash-games" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <VideogameAssetIcon />
                    </ListItemIcon>
                    <ListItemText primary="Crash game" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="/dashboard" sx={{ textDecoration: 'none', color: 'MenuText' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AnalyticsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
      <Snackbar open={snacksStore.open} autoHideDuration={6000} onClose={() => closeSnack()} message={snacksStore.message}>
        <Alert onClose={() => closeSnack()} severity={snacksStore.severity} variant="filled" sx={{ width: '100%' }}>
          {snacksStore.message}
        </Alert>
      </Snackbar>
    </>
  );
};

Component.displayName = 'Root';

export const loader = ({ request }: LoaderFunctionArgs) => {
  if (!LS.getItem(LSKeys.AuthToken, '')) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
};
