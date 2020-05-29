/*
'S' stands for single responsibility principle.
Every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class, module or function.
*/

//BAD EXAMPLE

class CalorieTracker{
    constructor(maxCalories){
        this.maxCalories = maxCalories
        this.currentCalories = 0
    }

    trackCalories(calorieCount){
        this.currentCalories += calorieCount
        if(this.currentCalories > this.maxCalories){
            this.logCalorieSurplass()
        }
    }

    logCalorieSurplass(){
        console.log("Max calories exceeded")
    }
}

const calorieTracker = new CalorieTracker(2000)
calorieTracker.trackCalories(400)
calorieTracker.trackCalories(1200)
calorieTracker.trackCalories(750)

//GOOD EXAMPLE
//logMessage function encapsulates all the logic of logging our calorie surplass

function logMessage(message){
    console.log(message)
}

class CalorieTracker{
    constructor(maxCalories){
        this.maxCalories = maxCalories
        this.currentCalories = 0
    }

    trackCalories(calorieCount){
        this.currentCalories += calorieCount
        if(this.currentCalories > this.maxCalories){
            logMessage("Max calories exceeded")
        }
    }
}

/*
'O' stands for open-closed principle.
Should be open for extension, but closed for modification. Such an entity can allow its behaviour to be extended without modifying its source code.
*/

//BAD EXAMPLE

function printQuiz(questions){
    questions.forEach(question => {
        console.log(questions.description)
    });
    switch (question.type){
        case 'boolean':
            console.log('1. True')
            console.log('2. False')
            break
        case 'multipleChoice':
            question.options.forEach((option, index) => {
                console.log(`${index + 1}. ${option}`)
            });
            break
        case 'text':
            console.log('Answer: __________')
            break
    }
    console.log('')
}

const questions = [
    {
        type: 'boolean',
        description: 'This example is great'
    },
    {
        type: 'multipleChoice',
        description: 'What is your favourite language?',
        option: ['JavaScript','Python','Ruby','Java']
    },
    {
        type: 'text',
        description: 'Describe your favourite JS feature.'
    }
]

printQuiz(questions)

//GOOD EXAMPLE

class BooleanQuestion {
    constructor(description){
        this.description = description
    }
    printQuestionChoices(){
        console.log('1. True')
        console.log('2. False')
    }
}

class multipleChoiceQuestion {
    constructor(description, options){
        this.description = description
        this.options = options
    }
    printQuestionChoices(){
        this.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`)
        });
    }
}

class TextQuestion {
    constructor(description){
        this.description = description
    }
    printQuestionChoices(){
        console.log('Answer: __________')
    }
}

function printQuiz(questions){
    questions.forEach(question => {
        console.log(question.description)
        question.printQuestionChoices()
        console.log('')
    });
}

const questions = [
    new BooleanQuestion('This example is great.'),
    new multipleChoiceQuestion(
        'What is your favourite language?',
        ['JavaScript','Python','Ruby','Java']
    ),
    new TextQuestion('Describe your favourite JS feature.')
]

printQuiz(questions)

/*
'L' stands for Liskov substitution principle.
All this is stating is that every subclass/derived class should be substitutable for their base/parent class.
*/

//CLASSIC EXAMPLE

class Rectangle {
    constructor(width, height){
        this.width = width
        this.height = height
    }
    setWidth(width){
        this.width = width
    }
    setHeight(height){
        this.height = height
    }
    area(){
        return this.width * this.height
    }
}

class Square extends Rectangle {
    setWidth(width){
        this.width = width
        this.height = height
    }
    setHeight(height){
        this.width = width
        this.height = height
    }
}

function increaseRectangleWidth(rectangle){
    rectangle.setWidth(rectangle.width + 1)
}

const rectangle1 = new Rectangle(10,2)
const square2 = new Square(5,5)

increaseRectangleWidth(rectangle1)
increaseRectangleWidth(square2)
console.log(rectangle1.area()) //outputs 22
console.log(square2.area()) //outputs 36, not 30

//AN EXAMPLE
/*
But there's a problem of inheritance vs composition
Inheritance can get very messy so we have to look into composition
Ducks can fly and swim but we cannot extend from 2 classes 
*/
class FlyingBird {
    fly(){
        console.log('I can fly')
    }
}

class SwimmingBird {
    swim(){
        console.log('I can swim')
    }
}

class Duck extends FlyingBird{
    quack(){
        console.log('I can quack')
    }
}

class Penguin extends SwimmingBird{
}

function makeFlyingBirdfly(bird){
    bird.fly()
}

function makeSwimmingBirdSwim(bird){
    bird.swim()
}

const duck = new Duck()
const penguin = new Penguin()
makeFlyingBirdfly(duck)
makeSwimmingBirdSwim(penguin)

/*
'I' stands for Interface segregation
There's no interface in javascript, but we can implement it in classes.
*/

//NOT SO GOOD EXAMPLE

class Entity {
    constructor(name, attackDamage, health){
        this.name = name
        this.attackDamage = attackDamage
        this.health = health
    }
    move(){
        console.log(`${this.name} moved.`)
    }
    attack(targetEntity){
        console.log(`${this.name} attcked ${targetEntity.name} for ${this.attackDamage} damage.`)
        targetEntity.takeDamage(this.attackDamage)
    }
    takeDamage(amount){
        this.health -= amount
        console.log(`${this.name} has ${this.health} health remaining.`)
    }
}

class Character extends Entity {
}

class Wall extends Entity {
    constructor(name, health){
        super(name, 0, health)
    }
    move(){
        return null
    }
    attack(){
        return null
    }
}

class Turret extends Entity {
    constructor(name, attackDamage){
        super(name, attackDamage, -1)
    }
    move(){
        return null
    }
    takeDamage(){
        return null
    }
}

const turret = new Turret('turret', 5)
const character = new Character('character', 3, 10)
const wall = new Wall('wall', 200)

turret.attack(character)
//turret attcked character for 5 damage.
//character has 5 health remaining.
character.move()
//character moved.
character.attack(wall)
//character attcked wall for 3 damage.
//wall has 197 health remaining.

//BETTER EXAMPLE
//Split it into components, which is like smaller interfaces

class Entity{
    constructor(name){
        this.name = name
    }
}

const mover = {
    move(){
        console.log(`${this.name} moved.`)
    }
}

const attacker = {
    attack(targetEntity){
        console.log(`${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage.`)
        targetEntity.takeDamage(this.attackDamage)
    }
}

const hasHealth = {
    takeDamage(amount){
        this.health -= amount
        console.log(`${this.name} has ${this.health} health remaining`)
    }
}

class Character extends Entity{
    constructor(name, attackDamage, health){
        super(name)
        this.attackDamage = attackDamage
        this.health = health
    }
}

//Assignment of different components to class
Object.assign(Character.prototype, mover, attacker, hasHealth)

class Wall extends Entity{
    constructor(name, health){
        super(name)
        this.health = health
    }
}

Object.assign(Wall.prototype, hasHealth)

class Turret extends Entity{
    constructor(name, attackDamage){
        super(name)
        this.attackDamage = attackDamage
    }
}

Object.assign(Turret.prototype, attacker)

const turret = new Turret('turret', 5)
const character = new Character('character', 3, 10)
const wall = new Wall('wall', 200)

turret.attack(character)
character.move()
character.attack(wall)

/*
'D' stands for Dependency Inversion Priciple.
High level modules should not depend on low level modules; both should depend on abstractions. Abstractions should not depend on details.

BELOW EXAMPLE IS A STORE INITIALLY USING CREDIT CARD X, BUT THAN DECIDED TO SWITCH TO CREDIT CARD Y.
*/

class Store {
    constructor(user){
        this.creditCardX = new CreditCardX(user)
    }
    purchaseBike(quantity){
        this.creditCardX.makePayment(200 * quantity * 100)
    }
    purchaseHelmet(quantity){
        this.creditCardX.makePayment(15 * quantity * 100)
    }
}

//treat below as a CreditCardX API
class CreditCardX{
    constructor(user){
        this.user = user
    }
    makePayment(amountInCents){
        console.log(`${this.user} made a payment of $${amountInCents / 100} using Credit Card X`)
    }
}

const store = new Store('Store Best')
store.purchaseBike(2) //outputs Store Best make a payment of $400 using Credit Card X
store.purchaseHelmet(2) //outputs Store Best make a payment of $30 using Credit Card X


/*
class CreditCardY {
    makePayment(user,amountInDollars){
        console.log(`${user} made a payment of $${amountInDollars} using Credit Card Y`)
    }
}

IF THE STORE DECIDED TO ACCEPT A NEW PAYMENT SYSTEM CREDIT CARD Y, WE'LL HAVE TO INSERT IT TO THE CONSTRUCTOR OTHER PLACES EG. PURCHASEBIKE, AND THAT CAN GET MESSY, SO BELOW IS A BETTER EXAMPLE BY CREATING A 'WRAPPER' THAT CAN WRAP AROUND BOTH CREDIT CARD X AND Y, WITH THE EXACT SAME METHOD/FUNCTION/INTERFACE
*/

//BETTER EXAMPLE

class Store{
    constructor(paymentProcessor){
        this.paymentProcessor = paymentProcessor
    }
    purchaseBike(quantity){
        this.paymentProcessor.pay(200 * quantity)
    }
    purchaseHelmet(quantity){
        this.paymentProcessor.pay(15 * quantity)
    }
}

class CreditCardYoloPaymentProcessor{
    constructor(user){
        this.creditCardYolo = new CreditCardYolo(user)
    }
    pay(amountInDollars){
        this.creditCardYolo.makePayment(amountInDollars * 100)
    }
}

class CreditCardYolo{
    constructor(user){
        this.user = user
    }
    makePayment(amountInCents){
        console.log(`${this.user} made a payment of $${amountInCents / 100} with Credit Card Yolo`)
    }
}

const store = new Store(new CreditCardYoloPaymentProcessor('Sally'))
store.purchaseHelmet(2)
//outputs Sally made a payment of $30 with Credit Card Yolo
store.purchaseBike(2)
//outputs Sally made a payment of $400 with Credit Card Yolo

//SO, IF WE WANT TO PAY USING A NEW CREDIT CARD Z, WE DO THIS BELOW EASILY

class CreditCardZuluPaymentProcessor{
    constructor(user){
        this.creditCardZulu = new CreditCardZulu(user)
    }
    pay(amountInDollars){
        this.creditCardZulu.makePayment(amountInDollars * 100)
    }
}

class CreditCardZulu{
    constructor(user){
        this.user = user
    }
    makePayment(amountInCents){
        console.log(`${this.user} made a payment of $${amountInCents / 100} with Credit Card Zulu`)
    }
}

const store2 = new Store(new CreditCardZuluPaymentProcessor('John'))
store2.purchaseHelmet(4) //outputs John made a payment of $60 with Credit Card Zulu
store2.purchaseBike(3) //outputs John made a payment of $600 with Credit Card Zulu