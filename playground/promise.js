var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout (() => {
            if (typeof a === 'number' && typeof b === 'number') resolve (a + b);
            else reject('Arguments must be numeric');
        }, 1500);
    });
};

// asyncAdd(5, 8).then(
//     (result) => { 
//         console.log(`The answer is: ${result}`);
//         return asyncAdd(result, 34);
//     }, // on resolve
//     (errorMessage) => {
//         console.log(errorMessage);
//     } // on reject
// ).then(
//     (result) => {
//         console.log(`The answer is: ${result}`);
//     }, //on resolve
//     (errorMessage) => {
//         console.log(errorMessage);
//     } // on reject
// );

asyncAdd(5, 8).then(
    (result) => { // on resolve
        console.log(`The answer is: ${result}`);
        return asyncAdd(result, 34);
    }).then(
        (result) => { // on resolve
            console.log(`The answer is: ${result}`);
        }).catch( // on any reject
            (errorMessage) => {
                console.log(errorMessage);
            });

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey, it worked!');
//         //reject('Unable to fulfil promise.');
//     }, 2500);
// });

// somePromise.then(
//     (message) => { console.log(`Success: ${message}`); }, //on resolve
//     (errorMessage)  => { console.log(`Error: ${errorMessage}`); }   // on reject
// );
