import React from "react";
import WeatherKeyInfo from "./WthrStats.jsx";
import { Logo } from "../misc/Logo.jsx";
import { getWeatherIcon } from "../../utils/getWeatherIcon.js";

export default function WthrContent({
  loading,
  refreshData,
  globalCurrentData,
  globalForecastData,
}) {
  if (loading === true) {
    return (
      <div className="grid h-full border-b-4 rounded-md bg-foreground dark:bg-dark-foreground min-w-fit border-component-border dark:border-dark-component-border">
        <div className="flex flex-col items-center justify-between w-full h-full px-6 py-16 2xl:px-12">
          <div className="flex flex-col w-full gap-3 xl:gap-6 2xl:gap-9">
            <div className="flex flex-col items-center w-full gap-3 xl:gap-4 2xl:gap-6">
              <p className="text-xl font-medium text-center xl:text-2xl 2xl:text-4xl text-primary-tw dark:text-dark-primary-tw">
                Loading...
              </p>
              <img
                className="size-24 xl:size-36 2xl:size-48"
                src={process.env.PUBLIC_URL + "/assets/not-available.svg"}
                alt="Loading"
              />
              <div className="flex flex-col xl:gap-1 2xl:gap-2">
                <p className="text-2xl font-bold text-center xl:text-3xl 2xl:text-5xl text-primary-tw dark:text-dark-primary-tw">
                  Loading...
                </p>
                <p className="text-xs text-center xl:text-sm text-primary-tw dark:text-dark-primary-tw">
                  Loading...
                </p>
              </div>
            </div>
            {/* Weather Details Wrapper */}
            <div className="grid items-center grid-cols-2 gap-2 w-fit xl:gap-3 2xl:gap-3">
              {/* Weather Key Pair */}
              <WeatherKeyInfo svg="sunrise" text="Loading..." />
              <WeatherKeyInfo svg="sunset" text="Loading..." />
              {/* Weather Key Pair */}
              <WeatherKeyInfo svg="thermometer" text="Loading..." />
              <WeatherKeyInfo svg="humidity" text="Loading..." />
              {/* Weather Key Pair */}
              <WeatherKeyInfo svg="wind" text="Loading..." />
              <WeatherKeyInfo svg="drizzle" text="Loading..." />
            </div>
          </div>

          {/* Logo */}
          <Logo onClick={refreshData} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full border-b-2 rounded-md bg-foreground dark:bg-dark-foreground min-w-fit border-component-border dark:border-dark-component-border">
      <div className="flex flex-col items-center justify-between w-full h-full px-6 py-16 2xl:px-12">
        <div className="flex flex-col w-full gap-3 xl:gap-6 2xl:gap-9">
          <div className="flex flex-col items-center w-full gap-3 xl:gap-4 2xl:gap-6">
            {globalCurrentData && (
              <p className="text-xl font-medium text-center xl:text-2xl 2xl:text-4xl text-primary-tw dark:text-dark-primary-tw">
                {globalCurrentData.location.name}
              </p>
            )}
            <img
              className="size-24 xl:size-36 2xl:size-48"
              src={getWeatherIcon(
                globalCurrentData && globalCurrentData.current.condition.code,
                1
              )}
              alt="Clear Day"
            />
            <div className="flex flex-col xl:gap-1 2xl:gap-2">
              <p className="text-2xl font-bold text-center xl:text-3xl 2xl:text-5xl text-primary-tw dark:text-dark-primary-tw">
                {globalCurrentData && globalCurrentData.current.temp_f}
              </p>
              <p className="text-xs text-center xl:text-sm text-primary-tw dark:text-dark-primary-tw">
                {globalCurrentData && globalCurrentData.current.condition.text}
              </p>
            </div>
          </div>
          {/* Weather Details Wrapper */}
          {globalCurrentData && globalForecastData && (
            <div className="grid items-center grid-cols-2 gap-2 w-fit xl:gap-3 2xl:gap-3">
              {/* Weather Key Pair */}
              <WeatherKeyInfo
                svg="sunrise"
                text={globalForecastData.astro.sunrise}
              />
              <WeatherKeyInfo
                svg="sunset"
                text={globalForecastData.astro.sunset}
              />
              {/* Weather Key Pair */}
              <WeatherKeyInfo
                svg="thermometer"
                text={globalForecastData.day.avgtemp_f + "°F"}
              />
              <WeatherKeyInfo
                svg="humidity"
                text={globalForecastData.day.avghumidity + " %"}
              />
              {/* Weather Key Pair */}
              <WeatherKeyInfo
                svg="wind"
                text={globalForecastData.day.maxwind_mph + " mph"}
              />
              <WeatherKeyInfo
                svg="drizzle"
                text={globalForecastData.day.daily_chance_of_rain + " %"}
              />
            </div>
          )}
        </div>

        {/* Logo */}
        <Logo onClick={refreshData} />
      </div>
    </div>
  );
}