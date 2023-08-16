import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState(""); // State to store the search input value
  const apiKey = "4e197bd341aaee2bdfbd1309d6d4e794"; // Replace with your API key
  const [city, setCity] = useState("Accra"); // Initial city

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  let weatherImage = null;

  if (weatherData) {
    const temperature = weatherData.main.temp;

    if (temperature < 10) {
      weatherImage = (
        <>
          <ion-icon
            name="rainy-outline"
            style={{ fontSize: "50px" }}
          ></ion-icon>
          <p>Rainy</p>
        </>
      );
    } else if (temperature >= 10 && temperature < 20) {
      weatherImage = (
        <>
          <ion-icon
            name="cloudy-outline"
            style={{ fontSize: "50px" }}
          ></ion-icon>
          <p>Normal</p>
        </>
      );
    } else {
      weatherImage = (
        <>
          <ion-icon
            name="sunny-outline"
            style={{ fontSize: "50px" }}
          ></ion-icon>
          <p>Sunny</p>
        </>
      );
    }
  }

  const currentDate = new Date();
  const currentDateTime = currentDate.toLocaleString();
  const sunriseTime = weatherData
    ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()
    : "";
  const sunsetTime = weatherData
    ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
    : "";

  const handleSearch = () => {
    setCity(inputValue);
  };

  return (
    <div>
      <Container fluid className="hello">
        <Row>
          <Col sm={7}>
            <p style={{ paddingTop: "20px" }}>
              <b>WeatherApp</b>
            </p>
            {weatherData ? (
              <div
                style={{
                  paddingTop: "430px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h1>
                  <b>{weatherData.main.temp}°</b>
                </h1>
                <h2 style={{ paddingTop: "10px", paddingRight: "20px" }}>
                  {weatherData.name}
                </h2>
                <p style={{ paddingBottom: "20px" }}>{weatherImage}</p>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </Col>
          <Col sm={5} className="list" style={{ height: "100vh" }}>
            <div>
              <Form inline>
                <Row>
                  <Col>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search.."
                      style={{
                        width: "400px",
                        background: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(0px)",
                        border: "none",
                        borderRadius: "5px",
                        color: "white",
                        height: "60px",
                      }}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </Col>
                  <Col style={{ position: "relative" }}>
                    <Button
                      type="button"
                      style={{
                        height: "60px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      onClick={handleSearch}
                    >
                      <ion-icon
                        name="search-outline"
                        style={{ fontSize: "30px" }}
                      ></ion-icon>
                    </Button>
                  </Col>
                </Row>
              </Form>
              <br />
              <p>
                <b>Weather Details</b>
              </p>
              <br />
              {weatherData && (
                <div>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <br />
                  <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                  <br />
                  <p>
                    Weather Description: {weatherData.weather[0].description}
                  </p>
                  <br />
                  <p>Country: {weatherData.sys.country}</p>
                  <br />
                  <hr />
                  <p>Sunrise: {sunriseTime}</p>
                  <br />
                  <p>Sunset: {sunsetTime}</p>
                  <br />
                </div>
              )}
              <p> {currentDateTime}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Weather;
