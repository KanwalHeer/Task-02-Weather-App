import WeatherApp from "./wheatherapp/weather";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 md:mb-6">Weather App</h1>
      <div className="bg-gray-200 text-black p-4 md:p-6 lg:p-8 shadow-lg shadow-gray-700 rounded-xl w-full max-w-lg">
        <WeatherApp/>
      </div> 
    </main>
  );
}
