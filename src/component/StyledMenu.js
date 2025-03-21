import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Avatar, IconButton } from '@mui/material';
import { AccountBox, DarkMode, LightMode, Logout, Person } from '@mui/icons-material';

import { ColorModeContext } from '../theme'
import {useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import ASSEST_URL from '../API/ASSETS_URL'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus({pictureURL}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const handleLogout = (e) => {
    handleClose()
    dispatch(logout(currentUser.id));
    navigate('/login')
  }

  return (
    <div>
        <IconButton
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
        >
          <Avatar alt='Profile' src={pictureURL ? `${ASSEST_URL}${pictureURL}`: <Person/> }/>
        </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple onClick={() => navigate('/profile')}>
          <AccountBox/>
          Account
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} disableRipple>
          <Logout/>
          Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
}