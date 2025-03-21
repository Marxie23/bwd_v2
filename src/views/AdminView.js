import React,{useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BarChart,Dashboard} from '@mui/icons-material'
import { tokens } from '../theme';
import {useDispatch } from 'react-redux'
import CustomizedMenus from '../component/StyledMenu';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PlayLessonOutlinedIcon from '@mui/icons-material/PlayLessonOutlined';
import GasMeterOutlinedIcon from '@mui/icons-material/GasMeterOutlined';
import { useMediaQuery } from '@mui/material';
import DashboardPage from '../views/pages/adminPage/Dashboard';
import ProfilePage from '../views/pages/adminPage/ProfilePage';
import BillingPage from '../views/pages/adminPage/ProfilePage';
import Billing from '../views/pages/adminPage/Billing';
import Customer from '../views/pages/adminPage/Customer';
import ReportPage from '../views/pages/adminPage/ReportPage';
import UserPage from '../views/pages/adminPage/User';
import BillingHistory from '../views/pages/adminPage/BillingHistory';
import AddBilling from '../views/pages/subpage/AddBilling';
import AddCustomer from '../views/pages/subpage/AddCustomer';
import Reading from '../views/pages/adminPage/Reading';
import AddMeterReading from '../views/pages/subpage/AddMeterReading';
import Meter from './pages/adminPage/Meter';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Notification from './pages/adminPage/Notifications';
import Settings from './pages/adminPage/Settings';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminView({username,accessType,pictureURL}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { user: currentUser} = useSelector((state)=> state.auth)

  const [open, setOpen] = useState(true);
  const [drawerDisplay, setDrawerdisplay] = useState('none');
  const [displayLogo, setDisplayLogo] = useState('unset');

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    const fetchUserFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if(!userData){
        navigate('/landing/login')
      }
    }
    fetchUserFromLocalStorage()
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
    setDrawerdisplay('unset');
    setDisplayLogo('unset');
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setDrawerdisplay('none');
    setDisplayLogo('none');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{display: 'flex', flexDirection: 'row', pr:'10px', alignItems: 'center', justifyItems:'end', backgroundColor: colors.primary[1000]}}>
        <Box sx={{ height: { xs: '50px', md: '60px' }, ml: 2, mr: 8, display: {lg: displayLogo, xs: 'none'} }}>
            <img src='https://res.cloudinary.com/dbfirdbxh/image/upload/v1742576822/Water_District_gmlfs2.png' alt='' style={{ height: '100%' }} />
        </Box>
        <Box>
            <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" >
                {open ?
                <Box>
                    <ChevronLeftIcon sx={{display:{md:'unset', sm:'none', xs: 'none'}}} onClick={handleDrawerClose} />
                    <MenuIcon sx={{display:{md:'none', sm:'unset'}}} onClick={handleDrawerClose} />
                </Box> :
                <Box>
                    <MenuIcon onClick={handleDrawerOpen} />
                </Box>
                }
            </IconButton>
            </Toolbar>
        </Box>
        <Box sx={{display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'flex-end', width:'100%'}}>
            <Box sx={{display:'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                <Box>
                    <CustomizedMenus pictureURL={pictureURL}/>
                </Box>
                <Box sx={{display:{md:'unset', sm:'none', xs:'none'}}}>
                    <Typography sx={{fontFamily:'Poppins', fontSize:'14px', fontWeight:'400' }}>{username}</Typography>
                    <Typography textTransform='capitalize' sx={{fontFamily:'Poppins', fontSize:'12px', fontWeight:'200' }}>{accessType}</Typography>
                </Box>
            </Box>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{display: {xs: drawerDisplay, md:'unset'}, bgcolor: '#2a2a2a'}}>
        <DrawerHeader>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/')}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={isXs || isSm ? handleDrawerClose : undefined} >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <Dashboard/>
              </ListItemIcon>
              <ListItemText primary='Dashboard' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/billing')}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={isXs || isSm ? handleDrawerClose : undefined} >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <BarChart/>
              </ListItemIcon>
              <ListItemText primary='Billing' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/customer')}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={isXs || isSm ? handleDrawerClose : undefined} >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <GroupIcon/>
              </ListItemIcon>
              <ListItemText primary='Customer' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/meter')}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={isXs || isSm ? handleDrawerClose : undefined} >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <GasMeterOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary='Meter' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/meterReading')}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={isXs || isSm ? handleDrawerClose : undefined} >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <PlayLessonOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary='Reading' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/users')}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={isXs || isSm ? handleDrawerClose : undefined} >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <PeopleOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary='Users' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/settings')}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={isXs || isSm ? handleDrawerClose : undefined} >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <SettingsOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary='Settings' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, mt:{xs:'50px', sm: '60px'} }}>
        <Routes>
          <Route path='/' element={<DashboardPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/customerBilling' element={<BillingPage/>}/>
          <Route path='/billing' element={<Billing/>}/>
          <Route path='/customer' element={<Customer/>}/>
          <Route path='/meter' element={<Meter/>}/>
          <Route path='/meterReading' element={<Reading/>}/>
          <Route path='/report' element={<ReportPage/>}/>
          <Route path='/users' element={<UserPage/>}/>
          <Route path='/billingHistory' element={<BillingHistory/>}/>
          <Route path='/notification' element={<Notification/>}/>
          <Route path='/settings' element={<Settings/>}/>

          <Route path='/billing/add' element={<AddBilling/>}/>
          <Route path='/customer/add' element={<AddCustomer/>}/>
          <Route path='/meterReading/add' element={<AddMeterReading/>}/>
        </Routes>
      </Box>
    </Box>
  )
}