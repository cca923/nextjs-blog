import Layout from "../../components/layout";

import utilStyles from "../../styles/utils.module.css";

export async function getServerSideProps() {
  const taipeiGeoRes = await fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=Taipei&limit=1&appid=410cfc593b0152c0793f36334885d376",
    {
      method: "GET",
    }
  );
  const taipeiGeoData = await taipeiGeoRes.json();

  const taipeiWeatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${taipeiGeoData[0].lat}&lon=${taipeiGeoData[0].lon}&appid=410cfc593b0152c0793f36334885d376`,
    {
      method: "GET",
    }
  );
  const taipeiWeatherData = await taipeiWeatherRes.json();
  return {
    props: {
      taipeiWeatherData,
    },
  };
}

export default function Weather({ taipeiWeatherData }) {
  function toCelsius(kelvin) {
    return kelvin - 273.15;
  }

  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>
          Taipei's ({taipeiWeatherData.name}) Weather
        </h1>
        <ol>
          <li>
            Weather Description｜{taipeiWeatherData.weather[0].description}
          </li>
          <li>
            Temperature｜
            {toCelsius(taipeiWeatherData.main.temp).toFixed(1)} °C
          </li>
        </ol>
      </article>
    </Layout>
  );
}
