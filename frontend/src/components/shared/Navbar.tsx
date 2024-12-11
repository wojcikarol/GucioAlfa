import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, Tooltip, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DriveEtaIcon from '@mui/icons-material/DriveEta';  // <-- Added car icon import
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface UserToken {
  isAdmin: boolean;
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<UserToken>(token);
        setIsAdmin(decoded.isAdmin);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const adminOptions = (
    <List>
      <ListItem button>
        <ListItemText primary="Manage Users" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Manage Parking Slot" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section: Parking State Button */}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              letterSpacing: 1,
              color: '#fff',
              marginRight: 2,
              cursor: 'pointer', // Add cursor pointer for clickable text
            }}
            onClick={() => navigate('/')} // Navigate to Home page when clicked
          >
            <DriveEtaIcon sx={{ fontSize: 30, marginRight: 1 }} />
            Smart Parking
          </Typography>
          <Button
  color="inherit"
  onClick={() => navigate('/parking-state')}
  sx={{
    textTransform: 'none',
    fontWeight: 500,
    paddingX: 2,
    borderRadius: 2, // Slightly rounded corners for better look
    '&:hover': {
      backgroundColor: '#555', // Darker grey to indicate hover effect
      borderBottom: '2px solid #fff', // Underline effect on hover
    },
    '&:focus': { // Style for focus (in case the button is selected via keyboard)
      outline: '2px solid #fff', 
    },
  }}
>
  Parking State
</Button>

        </Box>

        {/* Right Section: Logout and Admin Drawer */}
        <Box display="flex" alignItems="center">
          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{ marginRight: isAdmin ? 2 : 0 }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          {isAdmin && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="admin options"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    backgroundColor: '#000',
                    color: '#fff',
                    width: 250,
                    paddingTop: 2,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    paddingX: 2,
                    marginBottom: 2,
                    borderBottom: '1px solid #444',
                  }}
                >
                  Admin Panel
                </Typography>
                {adminOptions}
              </Drawer>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
