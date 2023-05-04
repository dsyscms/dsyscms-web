import {useEffect, useRef} from 'react';
import Artplayer from 'artplayer';
import './ArtPlayer.css'
import dashjs from "dashjs";
// import artplayerPluginDashQuality from "artplayer-plugin-dash-quality";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
export default function Player({option, getInstance, ...rest}) {

    const artRef = useRef();
    // Artplayer.SETTING_ITEM_WIDTH = 300;
    // Artplayer.SETTING_ITEM_HEIGHT = 40;
    // const ='https://artplayer.org/assets/sample/video.mp4';
    // const = 'https://dyctis843rxh5.cloudfront.net/vnIAZIaowG1K7qOt/master.m3u8';
    // const url = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
    const url = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    // const url = 'http://192.168.100.2:8080/?url=https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    // const url = 'http://192.168.100.2:8080/?url=https://test-streams.mux.dev/x36xhzz/url_0/193039199_mp4_h264_aac_hd_7.m3u8';
    let type='m3u8';
    let quality=[
        // {
        //     default: true,
        //     html: 'SD 480P',
        //     url: '/assets/sample/video.mp4',
        // },
        // {
        //     html: 'HD 720P',
        //     url: '/assets/sample/video.mp4',
        // },
    ];
    const plugin = [
        artplayerPluginHlsQuality({
            // Show quality in control
            control: false,

            // Show quality in setting
            setting: true,

            // Get the resolution text from level
            getResolution: (level) => level.height + 'P',

            // I18n
            title: '画质', //Quality
            auto: '自动', //AUto
        }),
        // artplayerPluginDashQuality({
        //     // Show quality in control
        //     control: false,
        //
        //     // Show quality in setting
        //     setting: true,
        //
        //     // Get the resolution text from level
        //     getResolution: (level) => level.height + 'P',
        //
        //     // I18n
        //     title: '画质', //Quality
        //     auto: '自动', //AUto
        // }),
    ];

    const customType = {
        m3u8: function playM3u8(video, url, art) {
            if (Hls.isSupported()) {
                if (art.hls) art.hls.destroy();
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                art.hls = hls;
                art.on('destroy', () => hls.destroy());
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
            } else {
                art.notice.show = 'Unsupported playback format: m3u8';
            }
        },
        mpd: function playMpd(video, url, art) {
            if (dashjs.supportsMediaSource()) {
                if (art.dash) art.dash.destroy();
                const dash = dashjs.MediaPlayer().create();
                dash.initialize(video, url, art.option.autoplay);
                art.dash = dash;
                art.on('destroy', () => dash.destroy());
            } else {
                art.notice.show = 'Unsupported playback format: mpd';
            }
        }
    }

    let pip = true;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // 当前设备是移动设备
        pip = false;
    }
    const id = "10000";
    useEffect(() => {
        const art = new Artplayer({
            ...option,
            container: artRef.current,
            // Show quality in setting
            setting: true,
            volume: 0.7,
            autoplay: true,
            autosize: true,
            fullscreen: true,
            fullscreenWeb: true,
            miniProgressBar: false,
            autoPlayback: true,
            playbackRate: true,
            aspectRatio: true,
            flip: true,
            pip: pip,
            //移动端
            lock: true,
            fastForward: true,
            autoOrientation: true,
            airplay: true,
            playsInline: true,
            type: type,
            muted: false,

            // type: 'mpd',

            url: url,
            id: id,
            cssVar: {
                //
            },
            quality: quality,
            settings: [
                {
                    width: 200,
                    html: '字幕', //Subtitle
                    tooltip: '关闭',
                    icon: '\n' +
                        '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48">\n' +
                        '    <path d="M0 0h48v48H0z" fill="none"/>\n' +
                        '    <path fill="#ffffff" d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM8 24h8v4H8v-4zm20 12H8v-4h20v4zm12 0h-8v-4h8v4zm0-8H20v-4h20v4z"/>\n' +
                        '</svg>',
                    selector: [
                        {
                            html: '关闭',
                            default: true,
                            url: 'close'
                        },
                        {
                            html: 'English',
                            url: '/assets/sample/subtitle.srt',
                        },
                        {
                            html: 'Chinese',
                            url: '/assets/sample/subtitle.cn.srt',
                        },
                    ],
                    onSelect: function (item) {

                        if (item.url === 'close') {
                            art.subtitle.show = false;
                            return item.html;

                        } else {
                            art.subtitle.switch(item.url, {
                                name: item.html,
                            });
                            return item.html;
                        }
                    },

                },

                {
                    // name: 'route-select-button',
                    width: 200,
                    html: '线路',
                    tooltip: '默认',
                    icon: '<svg t="1683059895533" class="icon" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg" p-id="5418" width="32" height="32"><path d="M523.2 105.7c-218.4 0-395.5 177.1-395.5 395.5s177.1 395.5 395.5 395.5 395.5-177.1 395.5-395.5c0-218.5-177.1-395.5-395.5-395.5z m-87.9 45.1c-36.2 39.7-65.4 103.3-83 180.6-57.2-9.5-103.8-21.4-130.6-29 49-74.3 124.8-129.4 213.6-151.6z m-80.7 669.8C240.1 760 162.1 639.7 162.1 501.1c0-61.3 15.3-119 42.2-169.5 19.1 5.9 71.8 21.1 141.3 33-4.8 27-8.1 55.5-10 84.9H370c1.7-27.7 4.7-54.3 9-79.6 44.2 6.3 93.5 10.8 144.2 10.8 29.4 0 58.3-1.5 86-4v-34.4c-27.7 2.5-56.6 4-86 4-48.3 0-95.2-4.1-137.8-9.9C411.1 219.8 463.1 140 523.2 140c49.3 0 93.2 53.8 121.5 137.6h34.5c-17.4-53-40.8-96.7-68.2-126.8 88.8 22.2 164.6 77.3 213.7 151.6-21.1 6-54.2 14.6-95.2 22.6v34.4c55.2-10.8 96.2-22.7 112.6-27.8 1.4 2.6 2.7 5.2 4.1 7.9-27.7 16.4-78.7 47.9-136.9 90.1-0.9-10.7-2.1-21.3-3.4-31.7h-34.3c2.3 18.1 4 36.8 5.1 56-38.3 29.3-78.3 62.6-115.8 98.8-67.9 65.6-119.8 133.1-154.8 184.5-15.8-42.5-27.3-93.7-33.2-150.1h-34.3c7.4 69.7 23.6 132.4 46 182.9-15.7 24.7-25.7 42.7-30 50.6z m32.5 15.1c4.7-7.7 10.3-17 17-27.4 9.7 16.5 20.2 31 31.3 43.2-16.6-4.2-32.8-9.5-48.3-15.8z m136.1 26.5c-37.8 0-72.5-31.7-99.4-84.3 38.9-58 98-137.1 171.6-208.2 27.9-26.9 55.8-51.4 82.5-73.3v4.7c0 199.5-69.2 361.1-154.7 361.1z m87.8-10.7c60.2-66.1 101.3-198.2 101.3-350.3 0-10.6-0.2-21.2-0.6-31.6 68.3-52.7 125-86.8 147.8-99.9 15.9 40.8 24.7 85.1 24.7 131.5 0.1 169.1-116.2 311-273.2 350.3z" fill="" p-id="5419"></path><path d="M402.8 466.8H299.7V570h103.2V466.8z m-34.4 68.7H334v-34.4h34.4v34.4zM712.3 294.8h-86v86h86v-86z m-34.4 51.6h-17.2v-17.2h17.2v17.2z" fill="" p-id="5420"></path><path d="M523.2 71.3c-237.4 0-429.9 192.5-429.9 429.9C93.3 738.6 285.8 931 523.2 931s429.9-192.5 429.9-429.9c0-237.4-192.5-429.8-429.9-429.8z m0 842.5c-227.9 0-412.7-184.8-412.7-412.7 0-227.9 184.8-412.7 412.7-412.7 227.9 0 412.7 184.8 412.7 412.7 0 228-184.8 412.7-412.7 412.7z" fill="" p-id="5421"></path></svg>',
                    selector: [

                        {
                            default: true,
                            html: '默认',
                            url: url
                        },

                        {
                            html: 'Cloudflare',
                            // url: 'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8'
                            url: 'https://test-streams.mux.dev/test_001/stream.m3u8'
                        },

                    ],
                    onSelect: function (item) {
                        //console.info(item);
                        art.switchQuality(item.url, item.html);

                        return item.html;
                    },
                },


            ],

            controls: [
                {
                    name: 'play-next-button',
                    index: 20,
                    position: 'left',
                    html: '<i class="art-icon" id="art-icon-play-next"><svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path  d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z" ></path></svg></i>',
                    // html: '<i class="art-icon"><svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22">\n' +
                    //     '    <path d="M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z"></path>\n' +
                    //     '</svg></i>',
                    style: {
                        color: 'red',
                    },
                    click: function (...args) {
                        // console.info('click', args);
                    },
                    mounted: function (...args) {
                        // console.info('mounted', args);
                    },
                },


            ],

            plugins: plugin,
            customType: customType
        });

        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        art.on('restart', (url) => {
            //console.info('restart', url);
        });

        art.on('ready', () => {
            console.log('ready')
        });

        art.on('loading', (state) => {
            //console.log(state);
            if (state) {
                //art.setting.toggle();
                art.setting.show = false;
            }

        });
        art.on('fullscreen', (state) => {
            console.info('fullscreen', state);
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // 当前设备是移动设备
            }else{
                if (state) {
                    document.getElementById('art-icon-play-next').setAttribute('style', '--art-control-icon-scale: 1.5 !important');
                } else {
                    document.getElementById('art-icon-play-next').setAttribute('style', '--art-control-icon-scale: 1.3 !important');
                }
            }
        });

        art.on('fullscreenWeb', (state) => {
            console.info('fullscreenWeb', state);
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // 当前设备是移动设备
            }else{
                if (state) {
                    document.getElementById('art-icon-play-next').setAttribute('style', '--art-control-icon-scale: 1.5 !important');
                } else {
                    document.getElementById('art-icon-play-next').setAttribute('style', '--art-control-icon-scale: 1.3 !important');
                }
            }
        });
        art.on('mini', (state) => {
            console.info('mini', state);
        });
        art.on('pip', (state) => {
            console.info('pip', state);
        });
        art.on('video:canplay', () => {
            console.info('video:canplay');
        });

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}
