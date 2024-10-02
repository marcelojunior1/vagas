import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vagas",
  description: "Sistema vagas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
              >
                <DashboardIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        {children}
      </body>
    </html>
  );
}
