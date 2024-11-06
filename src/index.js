import MediaPlayer from './MediaPlayerInit.js';
import AutoPlay from '../plugins/AutoPlay.js';
import AutoPause from '../plugins/AutoPause.js';

const video = document.querySelector("video");
const player = new MediaPlayer({
    el: video, 
    plugins: [
        new AutoPlay(), new AutoPause()
    ],
});

const playButton = document.querySelector("#play");
playButton.onclick = () => player.togglePlay();

const muttedButton = document.querySelector("#muted"); 
muttedButton.onclick = () => {
    if(player.media.muted){
        player.unmute(); //aqui no uso media como en el button de play porque unmute y mute es una funcion definida en player
    } else {
        player.mute();
    }
};

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log(error.message);
    });
}