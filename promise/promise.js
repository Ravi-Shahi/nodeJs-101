
const beer = new Promise((resolve, reject) => {
    const isAvialable = false
    if (isAvialable) {
        resolve("how many beers do you want?")
    } else {
        reject("Sorry! Out of stock!")
    }
})


beer
    .then((msg) => {
        console.log(msg)
    })
    .catch(msg => console.log(msg))
    .finally(() => console.log("Thank you for visiting!"))