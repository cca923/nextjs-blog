import Layout from "../../components/Layout";

import utilStyles from "../../styles/utils.module.css";

export async function getServerSideProps(props) {
  console.log("props", props);

  const cityGeoRes = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${props.query.city}&limit=1&appid=410cfc593b0152c0793f36334885d376`,
    {
      method: "GET",
    }
  );
  const cityGeoData = await cityGeoRes.json();

  if (!cityGeoData[0]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const cityWeatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData[0].lat}&lon=${cityGeoData[0].lon}&appid=410cfc593b0152c0793f36334885d376`,
    {
      method: "GET",
    }
  );
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
          <li>
            Temperature｜
            {toCelsius(cityWeatherData.main.temp).toFixed(1)} °C
          </li>
        </ol>
      </article>
    </Layout>
  );
}
