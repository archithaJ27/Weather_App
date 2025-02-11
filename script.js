const temperatureField = document.querySelector(".temp p"); // Fixed: Select <p> inside .temp
const locationField = document.querySelector(".time_location p:first-child"); // Select first <p> (location)
const dateField = document.querySelector(".time_location p:last-child"); // Select second <p> (date & time)
const weatherField = document.querySelector(".condition p"); // Select weather condition <p>
const searchField = document.querySelector(".search_field"); // Fixed: Matches HTML class
const form = document.querySelector('form');
form.addEventListener('submit', searchForLocation);

let target = 'Mumbai'; // Default location

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=91472f2c686a48c59d365436251102&q=${targetLocation}&aqi=no`; // Fixed URL

    try {
        const res = await fetch(url);
        const data = await res.json(); // Corrected for JSON format
        console.log(data); // Log data for debugging

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0]; // Extract date
    let splitTime = time.split(' ')[1]; // Extract time
    let currentDay = getDayName(new Date(splitDate).getDay()); // Get day of the week

    temperatureField.innerText = `${temp}°C`; // Update temperature
    locationField.innerText = locationName; // Update location
    dateField.innerText = `${splitDate} (${currentDay}) ${splitTime}`; // Update date & time
    weatherField.innerText = condition; // Update condition
}

function searchForLocation(e) {
    e.preventDefault(); // Prevent form submission
    target = searchField.value.trim(); // Get value from the search field
    if (target) {
        fetchResults(target);
    } else {
        console.warn("Search field is empty. Please enter a location.");
    }
}

fetchResults(target); // Fetch default location on page load

function getDayName(number) {
    switch (number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        default: return '';
    }
}
