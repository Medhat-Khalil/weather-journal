/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Full API URL
const getWeatherUrl = (zipcode) => {
        return `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`

    }
    // Personal API Key for OpenWeatherMap API
const apiKey = '67f6ba53af0bdfa175ce346bbf1764e8&units=imperial';
const generate = document.getElementById("generate");

/* Function called by event listener */
generate.addEventListener("click", async() => {
    const zipcode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;

    try {
        const res = await fetch(getWeatherUrl(zipcode))
        const data = await res.json()

        const temp = data.main.temp

        await fetch(`/saveData`, {
            method: "post",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: newDate,
                temp: temp,
                feelings: feelings
            })
        });
        const dataRes = await fetch("/getData", { credentials: "same-origin" })
        const finalData = await dataRes.json()

        updatingUI(finalData)
    } catch (err) {
        console.log(err);
    }
})

// function to get project data
// and updating UI by this data
const updatingUI = (data) => {

    try {

        document.getElementById("date").innerHTML = data.data;
        document.getElementById("temp").innerHTML = data.temp;
        document.getElementById("content").innerHTML = data.feelings;

    } catch (error) {
        console.log(error);
    }
}