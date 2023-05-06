"use client"
import React from 'react';
import Artplayer from '../ArtPlayer';

export default function Page() {
    // @ts-ignore
    return (
        <div className="video-container">

            <Artplayer
                option={{
                    // url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                // getInstance={(art) => console.log(art)}
                getInstance
            />
        </div>
    );
}