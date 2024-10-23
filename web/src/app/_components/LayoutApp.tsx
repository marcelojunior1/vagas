"use client"
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "@/app/_components/Header";
import Main from "@/app/_components/Main";

const theme = createTheme({ palette: { mode: 'dark' } });

export default async function LayoutApp({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Main>
                    {children}
                </Main>
            </ThemeProvider>
        </div>
    );
}
