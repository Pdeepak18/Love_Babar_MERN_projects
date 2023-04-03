// // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=dd85456a8b7eef6e21bc922714fbe238
// // https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=dd85456a8b7eef6e21bc922714fbe238

// // good code is to 
// // Write a function to fetch data from API
// // write another function to render the data to UI from the above function   

// async function getTemp(){

//     try{
//         const resp = await fetch("https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=dd85456a8b7eef6e21bc922714fbe238")
//         // console.log(resp);
//         const data = await resp.json()
//          console.log("weather Data",data);
    
//         // Destructing in Objects => ES6
//         // const {temp,humidity,pressure}=data.main;
//         // console.log(temp);
//         // console.log(data.weather[0]);
//         // console.log(data.weather[0].description);
    
//         // Destruction in arrays => ES6
//         // Here I rename the main with weathermood
//         // const {main:weathermood} =data.weather[0]
//         // console.log(weathermood);
    
//         console.log(data.main.temp);
//         console.log(`${data?.main?.temp.toFixed(2)} °C`); //Alt+0176
//         //render data to UI 
//         renderData(data)

//     }catch(e){
//         console.log("error Found" ,e); //If I am sending wrong api key or url then it will give error
//     }

// }


// function renderData(data){
//     console.log(data);
//     let temp=data.main.temp;
//     let newPara= document.createElement('p');
//     newPara.textContent= `${temp} °C ` ;
//     document.body.appendChild(newPara)

// }

// getTemp()



const userTab= document.querySelector("[data-userWeather]")
const searchTab= document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-Location-container")
const searchForm = document.querySelector("[data-searchForm]")
const loadingScreeen = document.querySelector(".loading-container")
const weatherInfoContainer = document.querySelector(".weather-Information")
const grantAccessBtn = document.querySelector("[data-grantAccess]")
const searchInput =document.querySelector("[data-searchInput]")
const errorPage = document.querySelector(".error-page")

// initially variable
let oldTab= userTab
const api_key= "dd85456a8b7eef6e21bc922714fbe238"
oldTab.classList.add("current-tab")
getfromSessionStorage();

function switchTab(newTab){
if(newTab != oldTab){
    oldTab.classList.remove("current-tab")
    oldTab=newTab;
    oldTab.classList.add("current-tab")

    if(!searchForm.classList.contains("active")){
        // kya search form vala is invisible., then make it visible
        grantAccessContainer.classList.remove("active")
        weatherInfoContainer.classList.remove("active")
        searchForm.classList.add("active")
    }else{
        // meh pehle search tab peh tha abb meh your weather vale tab peh hu toh usko visible karna hai
        searchForm.classList.remove("active")
        weatherInfoContainer.classList.remove("active")
        // Ab meh your weather vale tab meh aagya hu toh local storage pehle check karleta hu
        // for cordinated , if previously save hua hai toh
        getfromSessionStorage();
    }
}
}

userTab.addEventListener("click" , () =>{
    switchTab(userTab)
})

searchTab.addEventListener("click" , () =>{
    switchTab(searchTab)
})

// check if cordinates are already present 
function getfromSessionStorage(){
const localCordinates = sessionStorage.getItem("user-coordinate")
if(!localCordinates){
    grantAccessContainer.classList.add("active");
    console.log("not stored lat log");
}else{
    // json object meh convert kardiya Json string to JSOn object
    console.log("stored lat log");
    const cordinates=JSON.parse(localCordinates)
    fetchuserWeatherInfo(cordinates)
}

}

async function fetchuserWeatherInfo(cordinates){
    console.log(cordinates);
    const {lat,lon} = cordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active")
    // loader ko visible karo
    loadingScreeen.classList.add("active")
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        const data = await response.json()
        if(data.cod === 200){
            console.log("weather Data",data);
            errorPage.classList.remove("active")
            loadingScreeen.classList.remove("active")
            weatherInfoContainer.classList.add("active")
            renderWeatherInfo(data)
        }else{
            loadingScreeen.classList.remove("active")
            errorPage.classList.add("active")
        }
    }catch(err){
        loadingScreeen.classList.remove("active")
        console.log(err);
    }
}

function renderWeatherInfo(data){
    // fetch the elemnts
    const cityName = document.querySelector("[data-cityName]")
    const countryIcon =  document.querySelector("[data-countryIcon]")
    const description = document.querySelector("[data-weatherDesc]")
    const weatherIcon =document.querySelector("[data-weatherIcon]") 
    const temperature =document.querySelector("[data-temperature]") 
    const wind =document.querySelector("[data-windData]") 
    const humidity =document.querySelector("[data-humidityData]") 
    const cloud =document.querySelector("[data-cloudData]") 

    // fetch value
    cityName.innerText=data?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`
    description.innerText = data?.weather?.[0]?.description;
    // console.log(data?.weather?.[0]?.description);
    weatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0].icon}.png`
    temperature.innerText = `${data?.main?.temp} °C`;
    wind.innerText=` ${data?.wind?.speed} m/s`;
    humidity.innerText= `${data?.main?.humidity}%`;
    cloud.innerText =`${data?.clouds?.all}%`;

}
function getLocation(){
    console.log("in get location");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("something Goes Wrong")
    }
}

function showPosition(position){
    const userCordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinate" , JSON.stringify(userCordinates))
    fetchuserWeatherInfo(userCordinates)
}

grantAccessBtn.addEventListener("click",getLocation)

searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === ""){
        return;
    }else{
        fetchSearchWeatherInfo(cityName);
    }
})

async function fetchSearchWeatherInfo(cityName){
    loadingScreeen.classList.add("active")
    weatherInfoContainer.classList.remove("active")
    grantAccessContainer.classList.remove("active")
        try{
            const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=dd85456a8b7eef6e21bc922714fbe238`)
            // console.log(resp);
            const data = await resp.json()
            if(data.cod === 200){
                console.log("weather Data",data);
                errorPage.classList.remove("active")
                loadingScreeen.classList.remove("active")
                weatherInfoContainer.classList.add("active")
                renderWeatherInfo(data)
            }else{
                loadingScreeen.classList.remove("active")
                errorPage.classList.add("active")
            }
            
    
        }catch(e){
            console.log("error Found here" ,e); //If I am sending wrong api key or url then it will give error
        }
    
    }
