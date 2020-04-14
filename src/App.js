import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData, fetchPopulation } from "./api";
import coronaImage from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    population: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedPopulation = await fetchPopulation();
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData, population: fetchedPopulation });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country, population } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards population={population} data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
