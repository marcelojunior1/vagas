"use client"

import styles from "@/app/page.module.css";
import {
    AppBar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, SwipeableDrawer,
    Toolbar
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, {useState} from "react";
import WorkIcon from '@mui/icons-material/Work';
import BlockIcon from '@mui/icons-material/Block';
import Link from '@mui/material/Link';

export default function Header() {
    const [drawer, setDrawer] = useState(false);
    return (
        <div id="header" className={styles.header}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => setDrawer(true)}>
                            <DashboardIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <SwipeableDrawer
                role="presentation"
                open={drawer}
                onClose={() => {
                    setDrawer(false)
                }}
                onOpen={() => {
                }}
            >
                <List>
                    {[
                        {texto: 'Vagas', icon: <WorkIcon/>, link: "/vagas"},
                        {texto: 'Palavras Bloqueadas', icon: <BlockIcon/>, link:"/palavrasbloqueadas"}
                    ].map((obj) => (
                        <Link href={obj.link} key={obj.link} color={'textPrimary'} underline="none">
                            <ListItem key={obj.texto} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {obj.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={obj.texto}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </SwipeableDrawer>
        </div>
    );
}
