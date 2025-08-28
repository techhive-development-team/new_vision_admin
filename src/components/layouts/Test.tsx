import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  Inbox as InboxIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

const drawerWidth = 280;

const navItems = [
  { label: "Home", icon: <HomeIcon />, key: "home" },
  { label: "Dashboard", icon: <DashboardIcon />, key: "dashboard" },
  { label: "Messages", icon: <MailIcon />, key: "messages" },
  { label: "Inbox", icon: <InboxIcon />, key: "inbox" },
  { label: "Settings", icon: <SettingsIcon />, key: "settings" },
];

function Sidebar({ onNavigate }: { onNavigate: (key: string) => void }) {
  return (
    <Box role="presentation" sx={{ width: { xs: "100%", md: drawerWidth } }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
          My App
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.key} onClick={() => onNavigate(item.key)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}

function MainContent({ page }: { page: string }) {
  return (
    <Box sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        {page.charAt(0).toUpperCase() + page.slice(1)}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This is the {page} page. Replace this with your actual content.
      </Typography>

      {/* Example content grid */}
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((n) => (
          <Grid key={n} item xs={12} sm={6} lg={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Card {n}
                </Typography>
                <Typography variant="body2">
                  A responsive card. On mobile it spans full width, then 2-up on
                  small screens, then 4-up on large.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState<string>("home");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode },
        shape: { borderRadius: 14 },
        typography: {
          fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"`,
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                borderBottom: "1px solid",
                borderColor: "divider",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: { boxShadow: "none" },
            },
          },
        },
      }),
    [mode]
  );

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavigate = (key: string) => {
    setPage(key);
    if (!isMdUp) setMobileOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = <Sidebar onNavigate={handleNavigate} />;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Main App Bar (Top Navigation) */}
        <AppBar
          position="fixed"
          color="inherit"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            backdropFilter: "saturate(180%) blur(8px)",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? "rgba(255,255,255,0.8)"
                : "rgba(18,18,18,0.7)",
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            {!isMdUp && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              noWrap
              sx={{ flexShrink: 0, fontWeight: 800 }}
            >
              My App
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <TextField
              size="small"
              placeholder="Search…"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: 140, sm: 220, md: 320 } }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
              <Tooltip
                title={mode === "dark" ? "Switch to light" : "Switch to dark"}
              >
                <IconButton
                  onClick={() =>
                    setMode((m) => (m === "light" ? "dark" : "light"))
                  }
                  color="inherit"
                >
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Account">
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  aria-controls={anchorEl ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>TH</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleNavigate("settings")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("settings")}>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem>
                  <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />{" "}
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Side Drawer */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="sidebar folders"
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Page */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100vh",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.background.default,
          }}
        >
          <MainContent page={page} />

          {/* Example footer */}
          <Box sx={{ p: 3, pt: 0 }}>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="body2">
                © {new Date().getFullYear()} My App. All rights reserved.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button size="small">Privacy</Button>
                <Button size="small">Terms</Button>
                <Button size="small">Contact</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
