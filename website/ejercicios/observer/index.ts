interface Observer {
    update: (data: any) => void;
}

interface Subject {
    subscribe: (observer: Observer) => void;
    unsubscribe: (observer: Observer) => void;
}

class BitcoinPrice implements Subject {
    observers: Observer[] = [];

    constructor() {
        const el: HTMLInputElement | null = document.querySelector('#value');
        if (el) {
            el.addEventListener('input', () => {
                this.notify(el.value);
            });
        } else {
            console.error("Element with id 'value'  not found.");
        }

    }
    subscribe(observer: Observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer) {
        const index = this.observers.findIndex(obs => {
            return obs === observer;
        });
        if (index !== -1) {
            this.observers.splice(index, 1);
        }

    }

    notify(data: any) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class PriceDisplay implements Observer {
    private el: HTMLElement | null;
    constructor() {
        this.el = document.querySelector("#price");
        if (!this.el) {
            console.error("Element with id 'price' not found.");
        }
    }

    update(data: any) {
        if (this.el) {
            this.el.innerText = data;
        }

    }
}

const value = new BitcoinPrice();
const display = new PriceDisplay();

value.subscribe(display);

setTimeout(
    () => value.unsubscribe(display), 5000
);