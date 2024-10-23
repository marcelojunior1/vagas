"use client"

import styles from "@/app/page.module.css";
import {Paper} from "@mui/material";

export default async function Main({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={styles.main}>
            <Paper className={styles.papel} variant="outlined" elevation={1}>
                {children}
            </Paper>
        </div>
    );
}