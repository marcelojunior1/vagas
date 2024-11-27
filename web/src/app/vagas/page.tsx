"use client"

import styles from "@/app/page.module.css";
import {
    Box,
    Button,
    Chip,
    Container, IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText, TablePagination
} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {VagasResDto} from "@/app/_dto/VagasResDto";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const url_base: string = "http://localhost:8000/api/vagas/";

export default function Vagas() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [data, setData] = useState<VagasResDto[] | []>([]);
    const [loading, setLoading] = useState(true);

    const handleChangePage = () => {
        setPage(0);

        data.forEach((obj, index) => {
            if (index < rowsPerPage) {
                const id: string = obj.vaga._id;
                const url: string = url_base + id;
                axios.put(url, {
                    isApplied: false,
                    isUpdated: true
                }).then(() => console.log("OK"))
            }
        });

        setData(data.filter((obj, index) => index >= rowsPerPage))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    function aplicar(id: string) {
        const url: string = url_base + id
        axios.put(url, {
            isApplied: true,
            isUpdated: true
        }).then(() => setData(data.filter((obj) => obj.vaga._id !== id)))
    }

    function deletar(id: string) {
        const url: string = url_base + id;
        axios.delete(url, {
        }).then(() => setData(data.filter((obj) => obj.vaga._id !== id)))
    }

    return (
        <div id="vagas">
            <Box component="section" className={styles.opcoes} sx={{p: 2}}>
                <Button onClick={deletaTudo} variant="contained">Deletar tudo</Button>
                <TablePagination
                  component="div"
                  count={data.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Box>

            <Box hidden={!loading} sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>

            <Container hidden={loading}>
                <ul>
                    <List sx={{width: '100%'}}>
                        {data.map(({pred, vaga}, index) => {
                            if (index < rowsPerPage) {
                                return (
                                    <ListItem
                                        sx={{marginBottom: 2, gap: 1}}
                                        key={vaga._id}
                                        disablePadding
                                    >
                                        <Chip sx={{minWidth: 70}} size="small" label={pred} variant="outlined" />

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

                                        <Button onClick={() => aplicar(vaga._id)}  variant="outlined" endIcon={<SendIcon />}>Aplicar</Button>
                                        <IconButton onClick={() => deletar(vaga._id)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                )
                            }
                        })}
                    </List>
                </ul>
            </Container>
        </div>
    );
}
