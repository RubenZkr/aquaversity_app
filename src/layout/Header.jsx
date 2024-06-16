import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css'
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, Divider, MenuItem, Drawer } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { getLoggedInStatus, getRole, logout } from '../api/ServiceBus.js';
import { useAuth } from '../services/AuthContext.jsx';
import { SwitchModeButton } from '../components/themeSwitchButton.jsx';

const logoStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '8px',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
    border: '1px solid rgba(0,0,0,0.2)',
    backgroundColor: 'white',
};

function Header({ mode, toggleColorMode }) {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await getLoggedInStatus();
        const user = await getRole();
        setIsAdmin(user.role === 'admin');
        setIsAuthenticated(response.loggedIn);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, [setIsAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
      <div>
        <AppBar
            position="fixed"
            sx={{
              boxShadow: 0,
              bgcolor: 'transparent',
              backgroundImage: 'none',
              mt: 5,
            }}
        >
          <Container maxWidth="lg">
            <Toolbar
                variant="regular"
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  borderRadius: '999px',
                  bgcolor:
                      theme.palette.mode === 'light'
                          ? 'rgba(255, 255, 255, 0.4)'
                          : 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(24px)',
                  maxHeight: 40,
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow:
                      theme.palette.mode === 'light'
                          ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                          : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                })}
            >
              <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    ml: '-18px',
                    px: 0,
                  }}
              >
                <img
                    src={'../images/logo.png'}
                    style={logoStyle}
                    alt="logo of sitemark"
                />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <MenuItem component={Link} to="/" sx={{ py: '6px', px: '12px' }}>
                        <Typography variant="body2" color="text.primary">
                            Homepagina
                        </Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/levels" sx={{ py: '6px', px: '12px' }}>
                        <Typography variant="body2" color="text.primary">
                            Levels
                        </Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/forum" sx={{ py: '6px', px: '12px' }}>
                        <Typography variant="body2" color="text.primary">
                            Forum
                        </Typography>
                    </MenuItem>
                </Box>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
                <SwitchModeButton mode={mode} toggleColorMode={toggleColorMode} />

                {isAuthenticated && (
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        component={Link}
                        onClick={handleLogout}>
                        Logout
                    </Button>
                )}

                  {!isAuthenticated && (
                      <Button
                          color="primary"
                          variant="contained"
                          size="small"
                          component={Link}
                          to="/login">
                          Login
                      </Button>
                  )}
                  {!isAuthenticated && (
                      <Button
                          color="primary"
                          variant="contained"
                          size="small"
                          component={Link}
                          to="/register">
                          Registreer
                      </Button>
                  )}
                {isAuthenticated && (
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        component={Link}
                        to="/profile">
                        Profile
                    </Button>
                )}
                {isAdmin && (
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        component={Link}
                        to="/admin">
                        Admin
                    </Button>
                )}
              </Box>
              <Box sx={{ display: { sm: '', md: 'none' } }}>
                <Button variant="text" color="primary" aria-label="menu" onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
                  <MenuIcon />
                </Button>
                <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                  <Box sx={{ minWidth: '60dvw', p: 2, backgroundColor: 'background.paper', flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1 }}>
                      <SwitchModeButton mode={mode} toggleColorMode={toggleColorMode} />
                    </Box>
                    <MenuItem onClick={() => scrollToSection('features')}>Features</MenuItem>
                    <MenuItem onClick={() => scrollToSection('testimonials')}>Testimonials</MenuItem>
                    <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>
                    <MenuItem onClick={() => scrollToSection('pricing')}>Pricing</MenuItem>
                    <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                    <Divider />
                    <MenuItem>
                      <Button color="primary" variant="contained" component={Link} to="/material-ui/getting-started/templates/sign-up/" target="_blank" sx={{ width: '100%' }}>
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" component={Link} to="/material-ui/getting-started/templates/sign-in/" target="_blank" sx={{ width: '100%' }}>
                        Sign in
                      </Button>
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;
