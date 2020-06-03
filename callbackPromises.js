//CALLBACK FUNCTIONS
const userLeft = false;
const userWatchingMoneyHeist = false;

function watchTutorialCallback(callback, errorCallback) {
  if (userLeft) {
    errorCallback({
      name: "User left",
      message: ":(",
    });
  } else if (userWatchingMoneyHeist) {
    errorCallback({
      name: "User watching Money Heist",
      message: "It's fun though",
    });
  } else {
    callback("Thumbs up and subscribe!");
  }
}

watchTutorialCallback(
  (message) => {
    console.log("Success: " + message);
  },
  (error) => {
    console.log(error.name + " " + error.message);
  }
);

//Success: Thumbs up and subscribe!

//PROMISES are meant to replace callback
//here is a very basic example of its syntax
let p = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a == 2) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

p.then((message) => {
  console.log("This is the then" + message);
}).catch((message) => {
  console.log("This is in the catch" + message);
});

//TRANFORMING THE PREVIOUS CALLBACK TO PROMISE

function watchTutorialPromise() {
  return new Promise((resolve, reject) => {
    if (userLeft) {
      reject({
        name: "User left",
        message: ":(",
      });
    } else if (userWatchingMoneyHeist) {
      reject({
        name: "User watching Money Heist",
        message: "It's fun though",
      });
    } else {
      resolve("Thumbs up and subscribe!");
    }
  });
}

watchTutorialPromise()
  .then((message) => {
    console.log("Success: " + message);
  })
  .catch((error) => {
    console.log(error.name + " " + error.message);
  });
// Success: Thumbs up and subscribe!

const recordVideoOne = new Promise((resolve, reject) => {
  setTimeout(resolve, 50, "Video 1 recorded");
});
const recordVideoTwo = new Promise((resolve, reject) => {
  setTimeout(resolve, 30, "Video 2 recorded");
});
const recordVideoThree = new Promise((resolve, reject) => {
  setTimeout(resolve, 80, "Video 3 recorded");
});
Promise.all([
  recordVideoOne,
  recordVideoTwo,
  recordVideoThree,
]).then((messages) => console.log(messages));
// [ 'Video 1 recorded', 'Video 2 recorded', 'Video 3 recorded' ]
Promise.race([
  recordVideoOne,
  recordVideoTwo,
  recordVideoThree,
]).then((message) => console.log(message));
//Video 2 recorded
