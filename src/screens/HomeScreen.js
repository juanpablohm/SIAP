import React from "react"
import {  ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import {navigationItems} from "../config";
import {  Link, useLocation } from "react-router-dom";
import { Drawer, AppBar, mdTheme } from "./styles/HomeStyles";


const HomeScreen = () => {
	
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
            
                <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    {/* HEAD HORIZONTAL BAR */}
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                            pr: '24px', 
                            backgroundColor: "#003B70"
                            }}
                        >
                            {location.pathname !== "/evaluacion" && (
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                                >
                            SIAP
                            </Typography>
                            {location.pathname !== "/evaluacion" && (
                                <IconButton color="inherit">
                                <Badge badgeContent={1} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                                </IconButton>
                            )}
                        </Toolbar>
                    </AppBar>

                    {location.pathname !== "/evaluacion" && (
                        <Drawer variant="permanent" open={open}>
                            <Toolbar
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                                }}
                            >
                                <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon sx={{ color:"white" }} />
                                </IconButton>
                            </Toolbar >
                            <Divider />
                            <List component="nav" >
                                <React.Fragment>
                                    {navigationItems.sidebar.map((item) => (
                                    <Link style={{ textDecoration: 'none', color: '#000000' }}
                                    key={item.text}
                                    to={item.to}
                                    >
                                                <ListItemButton sx={{ "&:hover": { backgroundColor: "#a8a9ad" } }}>
                                                    <ListItemIcon sx={{ color:"white" }} >
                                                    <Icon fontSize="medium">{item.icon}</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ color:"white" }} primary={item.text} />
                                                </ListItemButton>
                                    </Link>
                                    ))}
                                </React.Fragment>          
                            </List>
                        </Drawer>    
                    )}   
                </Box>
                </ThemeProvider>
              
        );
}

export default HomeScreen;


