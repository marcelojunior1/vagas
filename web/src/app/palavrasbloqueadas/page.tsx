"use client"

import {Box, Button, Checkbox, List, ListItem, ListItemText, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "@/app/page.module.css";
import axios from "axios";
import {PalavraBloqueadaDto} from "@/app/_dto/PalavraBloqueadaDto";

const url_base: string = "http://localhost:8000/api";

export default function palavrasbloqueadas() {
    const [palavraNova, setPalavraNova] = useState<String>('');
    const [data, setData] = useState<PalavraBloqueadaDto[] | []>([]);

    useEffect(() => {
        if (data.length === 0) {
            fetch(url_base + '/palavrasbloqueadas')
                .then(response => response.json())
                .then(resultado => {
                    console.log(resultado)
                    const data: PalavraBloqueadaDto[] = resultado.data;
                    setData(data);
                } )
        }
    })

    function inserirPalavraNova() {
        if (palavraNova !== '') {
            axios.post(url_base + '/palavrasbloqueadas', {
                palavra: palavraNova,
                ativado: true
            }).then(() => {
                setPalavraNova('');

                fetch(url_base + '/palavrasbloqueadas')
                .then(response => response.json())
                .then(resultado => {
                    console.log(resultado)
                    const data: PalavraBloqueadaDto[] = resultado.data;
                    setData(data);
                } )
            })
        }
    }

    return (
        <div>
            <div className={styles.opcoes}>
                <Box component="section" className={styles.opcoes} sx={{p: 2}}>
                    <Button onClick={inserirPalavraNova} variant="contained">Inserir</Button>
                    <TextField
                        id="input_palavra_nova"
                        label="Palavra Nova"
                        value={palavraNova}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPalavraNova(String(event.target.value).toLowerCase());
                        }}
                    />
                </Box>
            </div>
            <List sx={{width: '100%'}}>
                {data.map(({palavra, ativado}) => {
                    return (
                        <ListItem
                            sx={{marginBottom: 2, gap: 1}}
                            key={palavra}
                            disablePadding>

                            <Checkbox
                                id={palavra}
                                checked={ativado}
                                sx={{color: "white"}}/>

                            <ListItemText sx={{maxWidth: 400}} id={palavra}
                                          primary={`${palavra}`}/>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}