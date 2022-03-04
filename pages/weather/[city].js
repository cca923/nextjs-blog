import styled from "styled-components";

import { fetchCityGeography, fetchCityWeather } from "../../apis/service";

import Layout from "../../components/Layout";

import utilStyles from "../../styles/utils.module.css";

const Temperature = styled.li`
  color: ${(props) => props.theme.colors.primary};
`;

export async function getServerSideProps(ctx) {
  // console.log("ctx", ctx);

  const cityGeoRes = await fetchCityGeography(ctx.query.city);
  const cityGeoData = await cityGeoRes.json();

  if (!cityGeoData[0]) {
    return {
      notFound: true,
    };
  }

  const cityLatitude = cityGeoData[0]?.lat;
  const cityLongitude = cityGeoData[0]?.lon;

  const cityWeatherRes = await fetchCityWeather(cityLatitude, cityLongitude);
  const cityWeatherData = await cityWeatherRes.json();

  return {
    props: {
      cityWeatherData,
    },
  };
}

export default function Weather({ cityWeatherData }) {
  function toCelsius(kelvin) {
    return kelvin - 273.15;
  }

  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>
          {cityWeatherData.name}'s Weather
        </h1>
        <ol>
          <li>Weather Description｜{cityWeatherData.weather[0].description}</li>

          <Temperature>
            Temperature｜
            {toCelsius(cityWeatherData.main.temp).toFixed(1)} °C
          </Temperature>
        </ol>
      </article>
    </Layout>
  );
}
