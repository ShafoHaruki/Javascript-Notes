const array1 = [1,2,3,4,5]
const array2 = [6,7,8,9]
const [one, two, ...rest] = array1
console.log(one) //outputs 1
console.log(rest) //outputs [ 3, 4, 5 ]
const combinedArray = [...array1, ...array2]
console.log(combinedArray) //outputs [1, 2, 3, 4, 5, 6, 7, 8, 9]

function sumAndMultiply(a,b,c){
  return [a+b, a*b, a/b]
}
const [sum, multiply, division="No value"] = sumAndMultiply(2,3)
console.log(sum) //outputs 5
console.log(multiply) //outputs 6
console.log(division) //outputs 0.6666666666

const person1 = {
    name:'Yamada',
    age:'21',
    address:{
      city:'Tokyo',
      country:'Japan'
    }
  }
  const person2 = {
    name:'Muthu',
    age:'23'
  }
  const {name: firstName, age, favouriteFood = "rice", address: {street = 'no street'}} = person1
  console.log(firstName) //outputs Yamada
  console.log(age) //outputs 21
  console.log(favouriteFood) //outputs rice
  console.log(street) //outputs no street
  const person3 = {...person1, ...person2}
  console.log(person3)
  //name and age of person1 gets overidden by person2
  /*
  outputs {
    name: 'Muthu',
    age: '23',
    address: { city: 'Tokyo', country: 'Japan' }
  }
  */
 function printUser({name, age}){
    console.log(`The name is ${name} and age is ${age}`)
  }
  printUser(person2) //outputs The name is Muthu and age is 23