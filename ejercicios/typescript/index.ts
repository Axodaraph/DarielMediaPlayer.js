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
