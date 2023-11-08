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
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAepJREFUaN7tmd2thCAQhSnBEijBEmjgJpZgCZZgCZZgCXZwLcFX3yiBDlhIhhvC5dcdFzeB5LzsTtjz4cwwZomUknyzSANoAA2gATQANICSdZ4nA/Wk0ioGUGY7pVVJKElLXGl6NIAySMGojGh9MsCRMG80Pw5AmRozzRvppzVoGNCk068mwFYI4JPArpMSgB0BwGj5doAVutnsdDNdYwwVAH5o8rTNqzoyGsKIAqAvKETjRkNGQxC5BR8EuMm8vJCO0cKPAXBs83DyXcF9YmvKBoDHfIf5/o2DESUAM7L5HU6eez4fraFwzEwvYQo9BLDfcPrM2dek02jd1vZnOfuyEMCKaH52OwqMGaF04vBdDsQaApgQT546Jy9g/1gtcHgSqUxYQgD0xrwvgR9gn5D6WBtdEC6s6e55KQbQWd3hijqECVakxoq33okzXj03pFpiNQCOT4zfSYCf35MprUpHaBMrhltzlKwOoAx1SkJJgnqPeR3DrRhmXYZY6q8CLJaxP3NOzOzEjOSDKwigT9sxtnvM01RMTYDdMUc9AG5M/wgAnQaOsdljfnBiFlJh/QPwFK4u0C5RuMKNqQngFu7wtMJNAYhUUebE1ATYYoULAFvNwk0BmFuVZty8lFRe7S+mBtAAGkADeFsvKpKWeAy6FowAAAAASUVORK5CYII="
            style={{ fontSize: "50px" }}
          />
          <p>Rainy</p>
        </>
      );
    } else if (temperature >= 10 && temperature < 20) {
      weatherImage = (
        <>
          <img
            src="https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png"
            style={{ fontSize: "50px" }}
          />
          <p>Cloudy</p>
        </>
      );
    } else {
      weatherImage = (
        <>
          <img
            src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
            style={{ fontSize: "50px" }}
          />
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
    <Container fluid className="hello">
      <Row>
        <Col lg={7} md={12}>
          {" "}
          {/* Adjust column widths for medium screens */}
          <p style={{ paddingTop: "20px" }}>
            <b>WeatherApp</b>
          </p>
          {weatherData ? (
            <div
              style={{
                paddingTop: "120px" /* Reduce the top padding */,
                display: "flex",
                justifyContent: "center",
                flexDirection:
                  "column" /* Center vertically on small screens */,

                alignItems: "center",
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
        <Col
          lg={5}
          md={12}
          className="list"
          style={{
            backgroundColor: " background-color: rgb(102, 190, 202)",
            minHeight: "100vh",
          }}
        >
          <div>
            <Form inline>
              <Row>
                <Col xs={8} md={8}>
                  {" "}
                  {/* Adjust column widths for small and medium screens */}
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search.."
                    style={{
                      width:
                        "100%" /* Make the input full width on small screens */,
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
                <Col xs={4} md={4}>
                  {" "}
                  {/* Adjust column widths for small and medium screens */}
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
                <p>Weather Description: {weatherData.weather[0].description}</p>
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
  );
};

export default Weather;
