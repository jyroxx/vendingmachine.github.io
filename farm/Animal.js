
async function setup() {}
async function setTimeoutAsync(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, ms)
    })
}


class Animal {
    name;
    age;
    legs;
    sex = "";
    extinct = false;
    lifetime = 50;

    constructor(name, age, legs, sex = "M", extinct = false) {
        this.name = name;
        this.age = age;
        this.legs = legs;
        this.sex = sex;
        this.extinct = extinct;
        console.log(this.name + " est âgé de " + this.age + " et a " + this.legs + " pattes.")
    }

    sleep(vie) {
        console.log(this.name + " est en train de dormir.")
        this.lifetime += vie
        console.log("Lifetime : " + this.lifetime)
    }

    getMood() {
        if (this.lifetime <= 33) {
            console.log(":(")
        }
        else if (this.lifetime <= 66) {
            console.log(":|")
        }
        else {
            console.log(":)")
        }
    }

}

class Dog extends Animal {
    nbrTeeth = 0

    constructor(nbrTeeth, name, age, legs = 2, sex = "N", extinct = true) {

        super(name, age, legs, sex, extinct)
        this.nbrTeeth = nbrTeeth
    }

}

class Bird extends Animal {
    nbrFeather = 0;
    constructor(nbrFeather, name, age,  sex = "N", extinct = true) {
        super(name, age, 2,  sex, extinct);
        this.nbrFeather = nbrFeather
    }
}


const animals = [];
animals.push()


setup().then(async () => {
    const dog = new Dog(32, "labrador", 5 );
    const dog2 = new Dog(32, "dd", 5 );
    console.log(dog)
    console.log(dog2.name)
    dog.sleep(20)
    dog.getMood()
    const pigeon = new Bird(2000, "Kevin", 1, "F", false )
    console.log(pigeon)
})