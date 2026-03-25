"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Sun, Cloud, CloudRain, CloudSnow } from "lucide-react"

// Mock weather data
const mockWeatherData = {
  current: {
    location: "Orange County, CA",
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 6,
    pressure: 30.12,
    feelsLike: 75,
  },
  forecast: [
    { day: "Today", high: 75, low: 62, condition: "Partly Cloudy", icon: "partly-cloudy" },
    { day: "Tomorrow", high: 78, low: 65, condition: "Sunny", icon: "sunny" },
    { day: "Wednesday", high: 73, low: 60, condition: "Cloudy", icon: "cloudy" },
    { day: "Thursday", high: 69, low: 58, condition: "Light Rain", icon: "rainy" },
    { day: "Friday", high: 71, low: 59, condition: "Partly Cloudy", icon: "partly-cloudy" },
  ],
  hourly: [
    { time: "12 PM", temp: 72, condition: "Partly Cloudy" },
    { time: "1 PM", temp: 74, condition: "Partly Cloudy" },
    { time: "2 PM", temp: 75, condition: "Sunny" },
    { time: "3 PM", temp: 76, condition: "Sunny" },
    { time: "4 PM", temp: 74, condition: "Partly Cloudy" },
    { time: "5 PM", temp: 72, condition: "Partly Cloudy" },
  ],
}

const WeatherIcon = ({ condition, size = 24 }: { condition: string; size?: number }) => {
  const iconProps = { size, className: "text-cyan-600" }

  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun {...iconProps} />
    case "cloudy":
      return <Cloud {...iconProps} />
    case "partly-cloudy":
      return <Cloud {...iconProps} />
    case "rainy":
    case "light rain":
      return <CloudRain {...iconProps} />
    case "snowy":
      return <CloudSnow {...iconProps} />
    default:
      return <Sun {...iconProps} />
  }
}

export default function WeatherDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [location, setLocation] = useState("Orange County, CA")
  const [searchQuery, setSearchQuery] = useState("")
  const [weatherData, setWeatherData] = useState(mockWeatherData)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLocation(searchQuery)
      setWeatherData({
        ...mockWeatherData,
        current: {
          ...mockWeatherData.current,
          location: searchQuery,
          temperature: Math.floor(Math.random() * 30) + 60,
        },
      })
      setLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Weather Dashboard</h1>
          <p className="text-gray-600">Real-time weather data and forecasts</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search for a city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading} className="bg-cyan-600 hover:bg-cyan-700">
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                {weatherData.current.location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-6xl font-bold text-gray-900 mb-2">{weatherData.current.temperature}°F</div>
                  <div className="text-xl text-gray-600">{weatherData.current.condition}</div>
                  <div className="text-sm text-gray-500">Feels like {weatherData.current.feelsLike}°F</div>
                </div>
                <WeatherIcon condition={weatherData.current.condition} size={80} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="text-blue-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Humidity</div>
                    <div className="font-semibold">{weatherData.current.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="text-gray-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Wind</div>
                    <div className="font-semibold">{weatherData.current.windSpeed} mph</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="text-purple-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Visibility</div>
                    <div className="font-semibold">{weatherData.current.visibility} mi</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="text-red-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Pressure</div>
                    <div className="font-semibold">{weatherData.current.pressure} in</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UV Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">{weatherData.current.uvIndex}</div>
                <div className="text-sm text-gray-600 mb-4">Moderate</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-orange-500 h-2 rounded-full"
                    style={{ width: `${(weatherData.current.uvIndex / 11) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">Wear sunscreen when outdoors</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Forecast */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {weatherData.hourly.map((hour, index) => (
                <div key={index} className="flex-shrink-0 text-center p-4 bg-gray-50 rounded-lg min-w-[100px]">
                  <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
                  <WeatherIcon condition={hour.condition} size={32} />
                  <div className="font-semibold mt-2">{hour.temp}°</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium">{day.day}</div>
                    <WeatherIcon condition={day.condition} size={24} />
                    <div className="text-sm text-gray-600">{day.condition}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">{day.low}°</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 relative">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-orange-400 h-2 rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <div className="font-semibold">{day.high}°</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="mt-8 border-cyan-200 bg-cyan-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-cyan-900 mb-2">Demo Features</h3>
            <ul className="text-sm text-cyan-800 space-y-1">
              <li>• Real-time weather data simulation with location search</li>
              <li>• Responsive dashboard with current conditions and forecasts</li>
              <li>• Interactive hourly and 5-day weather predictions</li>
              <li>• Weather icons and visual data representation</li>
              <li>• UV index tracking with visual indicators</li>
              <li>• Professional weather app UI/UX patterns</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
