import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import Navigate from './Components/Navigate';

function App() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);

  useEffect(() => {
    
    const fetchRegions = async () => {
      try {
        const response = await fetch('http://localhost:3001/regions');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchRegions();
  }, []);

  const handleRegionSelect = async (regionName) => {
    setSelectedRegion(regionName);
    setShowDropdown(false);
  
    try {
      const response = await fetch(`http://localhost:3001/region/${regionName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRegionData(data);
    } catch (error) {
      console.error('Error fetching region data:', error);
    }
  };

  const updateData = () => {
    // Implement your update logic here
    console.log('Updating data...');
  };

  const showDropdownAgain = () => {
    setShowDropdown(true);
    setSelectedRegion('');
    setRegionData([]);
  };

  return (
    <div className="App">
      <div className='topPanel'>
        <Navigate />
      </div>
      <div className='workingspace'>
        
        <div className="dropdown-container">
          {showDropdown && (
            <div className="dropdown">
              <label>Select Region:</label>
              <select className="select-region" onChange={(e) => handleRegionSelect(e.target.value)}>
                <option value="">-- Select Region --</option>
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedRegion && (
            <div>
              <h2 className="selected-region">{selectedRegion}</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>F.no</th>
                    <th>Farmer Name</th>
                    <th>Requirement</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Ph.no</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((row, index) => (
                    <tr key={index}>
                      <td>{row['F.no']}</td>
                      <td>{row['Farmer name']}</td>
                      <td>{row.Requirement}</td>
                      <td>{row.Quantity}</td>
                      <td>{row.Status}</td>
                      <td>{row['Ph.no']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="button-container">
                <Link to="/previous" onClick={showDropdownAgain} className="previous-page">
                  Previous Page
                </Link>
                <button onClick={updateData} className="update-button">
                  Update
                </button>
              </div>
            </div>
          )}
        </div>

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        
      </div>
      <div className="footer">
  <p>&copy; 2024 Krishi Bharat. All rights reserved.</p>
  <p>Contact: support@krishibharat.gov</p>
  <p>For any inquiries, <a href="support@krishibharat.gov">contact us</a>.</p>
  
</div>
    </div>
    
  );

}

export default App;
