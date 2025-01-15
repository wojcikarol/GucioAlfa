import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { jwtDecode } from 'jwt-decode'; // Poprawny import
import { useNavigate } from 'react-router-dom';

interface UserToken {
  isAdmin: boolean;
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Pobranie tokenu i ustawienie danych użytkownika
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<UserToken>(token);
        setIsAdmin(decoded.isAdmin);
        setUserName(decoded.name);
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAdmin(false);
        setUserName(null);
      }
    } else {
      setIsAdmin(false);
      setUserName(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    setUserName(null);
    navigate('/login');
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const adminOptions = (
    <List>
      <ListItem button onClick={() => navigate('/manage-users')}>
        <ListItemText primary="Manage Users" />
      </ListItem>
      <ListItem button onClick={() => navigate('/manage-parking-slots')}>
        <ListItemText primary="Manage Parking Slots" />
      </ListItem>
    </List>
  );
  

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section */}
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
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
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
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#555',
                borderBottom: '2px solid #fff',
              },
              '&:focus': {
                outline: '2px solid #fff',
              },
            }}
          >
            Parking State
          </Button>
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center">
          {userName ? (
            <>
              <Typography
                sx={{
                  color: '#fff',
                  marginRight: 2,
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                Welcome, {userName}
              </Typography>
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
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                paddingX: 2,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#555',
                  borderBottom: '2px solid #fff',
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
