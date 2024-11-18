import MediaPlayer from '../../MediaPlayerInit';
import Ads, { Ad } from './Ads';

class AdsPlugin {
    private ads: Ads;
    private player: MediaPlayer;
    private media: HTMLMediaElement | null = null; // Permite null
    private timeupdateHandler: () => void; // Manejador explícito
    private currentAd: Ad ;
    private adsContainer: HTMLElement;

    constructor() {
        this.ads = Ads.getInstance();
        this.adsContainer = document.createElement('div');
        this.adsContainer.style.position = 'absolute';
        this.timeupdateHandler = this.handleTimeUpdate.bind(this);
    }

    run(player: MediaPlayer) {
        this.player = player;
        this.player.container.appendChild(this.adsContainer);
        this.media = this.player.media as HTMLMediaElement || null; // Manejo de null
        if (this.media) {
            this.media.addEventListener('timeupdate', this.timeupdateHandler);
        } else {
            console.error("El elemento media es nulo.");
        }
    }

    destroy() { // Método para remover el event listener
        if (this.media) {
            this.media.removeEventListener('timeupdate', this.timeupdateHandler);
            this.media = null; // Limpia la referencia
        }
    }

    private handleTimeUpdate() {
        if (this.media) { // Verifica si media es válido
            const currentTime = this.media.currentTime; // No necesita Math.floor para este caso.  Se puede usar para mayor precisión si es necesario.
            if (Math.abs(currentTime % 30) < 0.5) { // Chequea si está cercano a un múltiplo de 30.
                this.renderAd();
            }
        }
    }

    private renderAd() {
        if(this.currentAd){
            return;
        }
        const ad= this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = `
        <div class="ads" style="display: flex;
        width: 300px;
        height: 100px;">
                <a class="ads__link" href="${this.currentAd.url}"  target="_blank" style="display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: auto;
                height: auto;">
                    <img class="ads__img" src="${this.currentAd.imageUrl}" alt="" style ="width: 100px;
                    height: 100px;">
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
        if (ad) {
            // Aquí va la lógica para mostrar el anuncio en el reproductor.
            // Ejemplo (requiere implementar una función para mostrar anuncios en el reproductor):
            console.log(ad);
            
            /* this.player.showAd(ad); */
        } else {
            console.warn("No hay anuncio disponible.");
        }
    }
}

export default AdsPlugin;

