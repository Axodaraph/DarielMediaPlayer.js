import MediaPlayer from '../../src/MediaPlayerInit';
import Ads, { Ad } from './Ads'

class AdsPlugin {
    private ads: Ads;
    private player: MediaPlayer;
    private media: HTMLMediaElement;
    private currentAd: Ad;
    private adsContainer: HTMLElement;

    constructor(){
        this.ads = Ads.getInstance();
        this.adsContainer = document.createElement('div');
        this.handleTimeUpdate.bind(this);
    }

    run(player: MediaPlayer) {
        this.player = player;
        this.media = this.player.media;
        this.player.container.appendChild(this.adsContainer);
        this.media.addEventListener('timeupdate', this.handleTimeUpdate);
    }

    private handleTimeUpdate () {
        const currentTime = this.media.currentTime;
        const currenttTime = Math.floor(currentTime);
        if(currenttTime % 30 === 0){
            this.renderAd();
        }
    }

    private renderAd(){
        if(this.currentAd){
            return;
        }
        const ad = this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = `
        <div class="ads">
                <a class="ads__link" href="${this.currentAd.url}"  target="_blank">
                    <img class="ads__img" src="${this.currentAd.imageUrl}" alt="" >
                    <div class="ads__info">
                        <h5 class="ads__title">${this.currentAd.title}</h5>
                        <p class="ads__body">${this.currentAd.body}</p>
                    </div>
                </a>
            </div>`;

            setTimeout(() => {
                this.currentAd = null;
                this.adsContainer.innerHTML = '';
            }, 5000)
        console.log(ad);
    }
}

export default AdsPlugin;