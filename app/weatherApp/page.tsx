"use client"
import { useState } from "react";
import { WiThermometerExterior } from "react-icons/wi";
import { TiWeatherCloudy } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";


export default function WeatherApp() {

 const [city, setCity] = useState("");
 const [error, setEroor] = useState("");
 const [weatherData, setWeatherData] = useState<any>(null)

   //api;
 const API_KEY = "909837695b3d0228a0cc8541bbce21d0";



 const fectchWeather = async () => {
       
    if (city === "") {
            setEroor("plz enter a city name");
            return
        }

     setEroor("");

  try {
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            if (!response.ok) {
                throw new Error("city not found!")

            }

    const data = await response.json()
    setWeatherData(data)
   
            

} catch (error) {
 setEroor("city not found")
 setWeatherData(null)

            
}
}

 const handelcityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
     setCity(e.target.value)
 }


       return (

        <div className='flex justify-center items-center'>
            <div className='bg-white h-[300px] w-[450px] mt-[200px] rounded-xl'>
            <h1 className='text-black text-2xl text-center mt-[20px] font-bold'>WeatherApp</h1>
            <p className="text-center mt-2 text-gray-600">Search for the current weather conditions in your city.</p>
            <div className=" mt-4 ml-[30px] ">

                  {/* inputvalue */}
             <input className="rounded-xl border border-gray-400 w-[300px] p-2 outline-none" type="text" placeholder="Enter a city name"
                value={city}
             onChange={handelcityInput}
                    />


                    {/* buuton */}
             <button onClick={fectchWeather} className="ml-4 p-2 border border-transparent rounded-2xl w-[80px] text-white bg-black ">  
             search</button>
                        

                       {/* error handling */}
             {error && <p className="text-red-500 text-center mt-2">{error}</p>}

             {weatherData && (

            <div>
              <div className="mt-4">

             <div className="flex flex-row">
                                <a className="mt-3 ml-[20px] text-2xl"><WiThermometerExterior /></a>
                                <p className="ml-[15px] mt-3 text-m font-medium">
                                    Its {weatherData.main.temp} °C in {weatherData.name}
                                </p>
             </div>
                           
              <div className="flex flex-row">
                                <a className="mt-2 ml-[20px] text-2xl"> <TiWeatherCloudy /></a>
                                <p className="ml-[15px] mt-2 text-m font-medium">{weatherData.weather[0].description}.</p>
                  </div>
                          
                          
              <div className="flex flex-row">
                                <a className="mt-2 ml-[20px] text-2xl"><IoLocationOutline /></a>
                                <p className="ml-[15px] mt-2 text-m font-medium "> Location: {weatherData.name}, {weatherData.sys.country}.</p>
              </div>

                 </div>
                 </div>)}
                </div>


            </div>
        </div>
    )
}
