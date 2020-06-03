function makeRequest(location) {
  return new Promise((resolve, reject) => {
    console.log(`Making request to ${location}`);
    if (location == "Google") {
      resolve("Google says hi!");
    } else {
      reject("We can only talk to Google");
    }
  });
}

function processRequest(response) {
  return new Promise((resolve, reject) => {
    console.log("Processing response");
    resolve(`Extra information + ${response}`);
  });
}

makeRequest("Google")
  .then((response) => {
    console.log("Response received");
    return processRequest(response);
  })
  .then((processedResponse) => {
    console.log(processedResponse);
  })
  .catch((err) => {
    console.log(err);
  });

/*
outputs
Making request to Google
Response received
Processing response
Extra information + Google says hi!
*/

//ASYNC AWAIT
//looks cleaner than the .then code above
async function doWork() {
  const response = await makeRequest("Google");
  console.log("Response received");
  const processedResponse = await processRequest(response);
  console.log(processedResponse);
}
doWork();
//the output will also be the same as above

//BUT HOW DO WE HANDLE ERRORS? WE USE A TRY AND CATCH BLOCK
async function doWork() {
  try {
    const response = await makeRequest("facebook");
    console.log("Response received");
    const processedResponse = await processRequest(response);
    console.log(processedResponse);
  } catch (err) {
    console.log(err);
  }
}
doWork();
/*
outputs
Making request to Google
We can only talk to Google
*/

//NOTES
//Using async simply implies that a promise will be returned
//If a promise is not returned, JS will wrap it in a resolved promise with its value.
//Async await is just a syntax sugar
//The await operator is used for Javascript to wait for a Promise result
//It only makes the async function block wait and not the whole program execution.
