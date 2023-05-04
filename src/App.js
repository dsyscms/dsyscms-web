import logo from './logo.svg';
import './App.css';
import Artplayer from "./ArtPlayer";

function App() {

    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            <div>

                <Artplayer
                    option={{
                    }}
                    style={{
                        width: '600px',
                        height: '400px',
                        margin: '60px auto 0',
                    }}
                    getInstance={(art) => console.info(art)}
                />
            </div>
        </>
    );
}

export default App;
