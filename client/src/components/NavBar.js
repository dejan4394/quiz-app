import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import history from "../history"
import { useNavigate } from 'react-router';

import { useDispatch } from 'react-redux';
import { tokenActions } from '../store/token-slice';


const useStyles = makeStyles({
  menu_link: {
    color: "black",
    textDecoration: "none"
  },
  link: {
    color: 'white',
    textDecoration: "none"
  }
});

const ResponsiveAppBar = ({token}) => {

  const dispatch = useDispatch()

  const classes = useStyles()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    event.preventDefault()
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = ()=> {
    sessionStorage.removeItem("token")
    dispatch(tokenActions.deleteToken())
    // navigate('/')
    history.push("/")
    // window.location.href = '/'
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Link to="/" className={classes.link}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>
        </Link>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to="/categories" className={classes.menu_link}>Get Started</Link></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to="/categories" className={classes.menu_link}>Contact</Link></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to="/categories" className={classes.menu_link}>About</Link></Typography>
                </MenuItem>
             
            </Menu>
          </Box>
          
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
            <Link className={classes.link} to="/">
              LOGO
            </Link>
            </Typography>
          
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            </Box>
            {!token &&
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"flex-end" }}>
              <Link to="/categories" className={classes.link}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               <Link to="/categories" className={classes.link}>
               GET STARTED
               </Link>
              </Button>
            </Link>
            <Link to="/about" className={classes.link}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                ABOUT
              </Button>
            </Link>
            <Link to="/contact" className={classes.link}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                CONTACT
              </Button>
            </Link>
            </Box>}
          { token &&
          <Box sx={{ flexGrow: 0 }}>
           <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link to="/profile" className={classes.menu_link}>Profile</Link></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link to="/categories" className={classes.menu_link}>New Quizz</Link></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={handleLogOut} textAlign="center"><Link to="/" className={classes.menu_link}>Log Out</Link></Typography>
                </MenuItem>
            </Menu>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
