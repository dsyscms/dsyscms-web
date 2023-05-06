"use client"
import React from 'react';
import Button from '@mui/material/Button';
import Artplayer from '../ArtPlayer';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./Theme";
// import useMediaQuery from '@mui/material/useMediaQuery';

// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
function Profile() {
    return (
        <h1>hello word!</h1>
    );
}


function VideoPlayer() {
    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <div className="video-container" id="video-container">
                <Artplayer
                    option={{
                        // url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    // getInstance={(art) =>
                    //     // console.log(art)
                    // }
                    getInstance
                />
            </div>
            <div className="center">
                <Button variant="contained" className="change-video">切换视频</Button>
            </div>

        </ThemeProvider>


    );
}

export default function Page() {
    // @ts-ignore
    return (

        <>
            {/*<Profile/>*/}
            {/*<Button variant="contained">Hello World</Button>*/}

            <VideoPlayer/>
        </>

    );
}