import MediaPlayer from '@axodaraph/platzimediaplayer/lib/MediaPlayerInit';
import AutoPlay from '@axodaraph/platzimediaplayer/lib/plugins/AutoPlay';
import AutoPause from '@axodaraph/platzimediaplayer/lib/plugins/AutoPause';
import Ads from '@axodaraph/platzimediaplayer/lib/plugins/Ads/ratatata';

const video = document.querySelector("video");
const player = new MediaPlayer({
    el: video, 
    plugins: [
        new AutoPlay(), new AutoPause(), new Ads()
    ],
});

const playButton: HTMLElement | null = document.querySelector("#play");
if(playButton){
    playButton.onclick = () => player.togglePlay();
} else {
    console.error('problemas con el boton de play');
}


const muttedButton: HTMLElement | null = document.querySelector("#muted"); 
if(muttedButton){
    muttedButton.onclick = () => {
        if(player.media.muted){
            player.unmute(); //aqui no uso media como en el button de play porque unmute y mute es una funcion definida en player
        } else {
            player.mute();
        }
    };
} else {
    console.error('el boton de muteado esta presentado errores');
}


if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log(error.message);
    });
}