//Boolean
let muted: boolean = true;

muted = false;

//Numeros

let numerador: number = 42;
let denominador: number = 6;
let resultado = numerador / denominador;

//String
let nombre: string = "Richard";
let saludo = console.log(`Guten Morgen ${nombre}`);

//Arreglos
let people: string[] = [];
people = ["ISABEL", "NICOLE", "JUAN"];
people.push("1000");
console.log(people);

let peopleAndNumbers: Array< string | number > = [];
peopleAndNumbers.push("Ricardo");
peopleAndNumbers.push(9000);

//Enum
enum Color {
    Rojos = "Rojo",
    Verde = "Verde",
    Azul = "Azul",
}

let colorFavarito: Color = Color.Verde;
console.log(`Mi color favorito es ${colorFavarito}`);

//Funciones
function add(a: number, b: number): number{
    return a+b;
}
const sum = add(5,10);

//creador de sumas
function createAdder(a: number){
    return function(c: number) {
        return c + a;
    };
}

const addFour = createAdder(4);
const fourPlus6 = addFour(6);
console.log(fourPlus6);


function fullName(firstName: string, lastName?: string){
    return `${firstName} ${lastName}`;
}

//lastName?: string significa que es un campo opcional
//lasName: string = 'Smith' le asigna un valor por defecto a ese campo


const richard = fullName('Richard');

//Interfaces
enum Color {
    red = "rojo",
    blue = "azul"
}
interface Rectangulo {
    ancho: number
    alto: number
    color?: Color
}

let rect: Rectangulo = {
    ancho: 4,
    alto: 6,
    color: Color.red
}

function area(r: Rectangulo){
    return r.alto*r.ancho;
}

const areaRect = area(rect);
console.log(areaRect);
rect.toString = function() {
    return this.color ? `Un rectangulo ${this.color}` : `Un rectangulo`;
};
console.log(rect.toString());