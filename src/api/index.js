import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopulation = async () => {
  try {
    const {
      data: { body },
    } = await axios({
      method: "GET",
      url: "https://world-population.p.rapidapi.com/worldpopulation",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "world-population.p.rapidapi.com",
        "x-rapidapi-key": "27d668ba2amsh5b3d038f0a200c6p1f735ejsnff1546975785",
      },
    });
    return body;
  } catch (error) {
    console.log(error);
  }
};
