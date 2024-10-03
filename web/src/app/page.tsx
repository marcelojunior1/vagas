"use client"

import styles from "./page.module.css";
import {
    Button,
    Container,
    List,
    ListItem,
    ListItemButton,
    Checkbox,
    ListItemText, Box, LinearProgress, SwipeableDrawer, ListItemIcon, AppBar, Toolbar, IconButton
} from "@mui/material";

import React, {useEffect, useState} from "react";
import axios from "axios";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from "@mui/icons-material/Dashboard";
import {VagasResDto} from "@/app/dto/VagasResDto";

const url_base: string = "http://localhost:8000/api/vagas/";


export default function Page() {

    const [data, setData] = useState<VagasResDto[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        const url = "http://127.0.0.1:8000/api/vagas?infer=True&updated=False";
        if (loading) {
            fetch(url)
            .then(response => response.json())
            .then(resultado => {
                const data: VagasResDto[] = resultado.data;
                setData(data);
                setLoading(false);
            } )
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const id = event.target.id;
        setData(data.map((obj) => {
            if (obj.vaga._id === id)
                obj.vaga.isApplied = event.target.checked;
            return obj
        }));
    };

    function aplicar(id: string) {
        const url: string = url_base + id
        axios.put(url, {
            isApplied: false,
            isUpdated: true
        }).then(() => setData(data.filter((obj) => obj.vaga._id !== id)))
    }

    function deletar(id: string) {
        const url: string = url_base + id;
        axios.delete(url, {
        }).then(() => setData(data.filter((obj) => obj.vaga._id !== id)))
    }

    function atualizaTudo() {
        data.forEach((obj) => {
            const id: string = obj.vaga._id;
            const url: string = url_base + id;
            axios.put(url, {
                isApplied: obj.vaga.isApplied,
                isUpdated: true
        }).then(() => console.log("OK"))});
        setData([]);
    }

    function deletaTudo() {
        const deletados: string[] = [];

        for (let i = 0; i < data.length; i++) {
            const id: string = data[i].vaga._id;
            const url: string = url_base + id;
            axios.delete(url)
                .then(() => deletados.push(id));
        }
        setData([]);
    }

    return (
        <div className={styles.page}>
            <div className={styles.navbar}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                                onClick={() => setDrawer(true)}
                            >
                                <DashboardIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <main className={styles.main}>
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
                        {['Palavras bloqueadas'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </SwipeableDrawer>


                <Box component="section" className={styles.opcoes} sx={{p: 2}}>
                    <Button onClick={atualizaTudo} variant="contained">Atualizar tudo</Button>
                    <Button onClick={deletaTudo} variant="contained">Deletar tudo</Button>
                </Box>

                <Box hidden={!loading} sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>

                <Container hidden={loading}>
                    <ul>
                        <List sx={{width: '100%'}}>
                            {data.map(({pred, vaga}) => {
                                return (
                                    <ListItem
                                        sx={{marginBottom: 2, gap: 1}}
                                        key={vaga._id}
                                        disablePadding
                                    >
                                        <p style={{width: 40}} className={styles.pred}> {pred} </p>

                                        <Checkbox
                                            id={vaga._id}
                                            checked={vaga.isApplied} onChange={handleChange}
                                            sx={{color: "white"}}
                                        />

                                        <ListItemButton sx={{gap: 2}}
                                                        role={undefined}
                                                        dense
                                                        component="a"
                                                        href={"https://www.linkedin.com/jobs/view/" + vaga._id}
                                                        target={"_blank"}
                                        >
                                            <ListItemText sx={{maxWidth: 400}} id={vaga._id}
                                                          primary={`${vaga.txtVaga}`}
                                            />
                                        </ListItemButton>

                                        <Button onClick={() => aplicar(vaga._id)} variant="outlined">Aplicar</Button>
                                        <Button onClick={() => deletar(vaga._id)} variant="outlined"
                                                color="error">Deletar</Button>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ul>
                </Container>
            </main>
        </div>
    );
}
