import MediaPlayer from './MediaPlayerInit.js'
const video = document.querySelector("video");
const button = document.querySelector("button");
const player = new MediaPlayer({el : video});
button.onclick = () => player.togglePlay(); 
        /* button.onclick = () => player.media.play(); */
        /* function handleButtonClick(){
            if(player.media.paused){
            button.onclick = () => player.media.play();
            button.textContent = 'Play';
            } else {
            button.onclick = () => player.media.pause();
            button.textContent = "Pause";
            }
        } */
        /* button.addEventListener("click", handleButtonClick); */