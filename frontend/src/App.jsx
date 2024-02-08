import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    // Fetch regions and years data
    fetch('http://localhost:8081/regions')
      .then(res => res.json())
      .then(regionData => setRegions(regionData))
      .catch(err => console.log(err));

    fetch('http://localhost:8081/years')
      .then(res => res.json())
      .then(yearData => setYears(yearData))
      .catch(err => console.log(err));

    // Fetch initial data
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch data based on selected region and year
    fetch(`http://localhost:8081/users?region=${selectedRegion}&year=${selectedYear}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // Fetch data whenever selectedRegion or selectedYear changes
    fetchData();
  }, [selectedRegion, selectedYear]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div style={{ padding: '50px' }}>
      <div>
        <label>Region:</label>
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="">All</option>
          {regions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>

        <label>Year:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">All</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
