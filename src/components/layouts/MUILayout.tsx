/*
MUI Sidebar Layout (TypeScript + React)
Filename suggestion: MUISidebarLayout.tsx

Install:
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

Usage:
Import and render <MUISidebarLayout /> inside your App.tsx
*/

import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 260;

interface Props {
  window?: () => Window;
}

export default function MUISidebarLayout(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h6" noWrap component="div">
          My App
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: "Home", icon: <HomeIcon /> },
          { text: "Inbox", icon: <InboxIcon /> },
          { text: "Mail", icon: <MailIcon /> },
          { text: "Settings", icon: <SettingsIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive MUI Layout
          </Typography>
        </Toolbar>
      </AppBar>
 
      {/* Drawer for mobile (temporary) */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
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

        {/* Permanent drawer on md+ */}
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* pushes content below AppBar */}
        <Typography paragraph>
          This is the main content area. Replace this with your pages or
          react-router outlet.
        </Typography>
        <Typography paragraph>Tips:</Typography>
        <ul>
          <li>
            Use react-router and render <code>&lt;Outlet /&gt;</code> or your
            pages inside the main Box.
          </li>
          <li>
            Customize drawer items to navigate. You can use{" "}
            <code>ListItemButton</code> as <code>Link</code>.
          </li>
          <li>
            Adjust <code>drawerWidth</code> to suit your design.
          </li>
        </ul>
      </Box>
    </Box>
  );
}
