import MediaPlayer from "../src/MediaPlayerInit";


class AutoPause {
    private threshold: number;
    player: MediaPlayer;
    constructor(){
        this.threshold = 0.25;
        this.handlerIntersection = this.handlerIntersection.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }
    run(player) {
        this.player = player;
        //se utiliza la palabara reservada intersectionObserver para ver que parte del obejto esta siendo vizualizad en la pantalla, se usa el callback(handlerIntersection) y la propiedad threshold 
        const observer = new IntersectionObserver(this.handlerIntersection, {
            threshold: this.threshold,
        });

        observer.observe(this.player.media);

        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }

     private handlerIntersection(entries: IntersectionObserverEntry[]){
        const entry = entries[0];
        /* console.log(entry); */
        //creo una variable para almacenar si es verdadero o no que la variable supera el rango de pantalla especificado
        const isVisible = entry.intersectionRatio >= this.threshold;

        if(isVisible){
            this.player.play();
        } else {
            this.player.pause();
        }
    }

    private handleVisibilityChange(){
        const isVisible = document.visibilityState ==="visible";
        if(isVisible){
            this.player.play();
        } else {
            this.player.pause();
        }
    }
}

export default AutoPause;

