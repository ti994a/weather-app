var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hey, it worked!');
        //reject('Unable to fulfil promise.');
    }, 2500);
});

somePromise.then(
    (message) => { console.log(`Success: ${message}`); }, //on resolve
    (errorMessage)  => { console.log(`Error: ${errorMessage}`) }   // on reject
);