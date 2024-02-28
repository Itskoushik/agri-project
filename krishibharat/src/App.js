import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import Navigate from './Components/Navigate';

function App() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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

  const updateData = async () => {
    try {
      const response = await fetch('http://localhost:3001/updateData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regionData, regionName: selectedRegion }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Data updated successfully');
      handleRegionSelect(selectedRegion);
    } catch (error) {
      console.error('Error updating data:', error);
    }

    setIsEditing(!isEditing); // Toggle editing mode
  };

  const addRow = () => {
    const newRow = {
      'F.no': '',
      'Farmer name': '',
      Requirement: '',
      Quantity: '',
      Status: '',
      'Ph.no': '',
    };

    setRegionData((prevData) => [...prevData, newRow]);
  };

  const showDropdownAgain = () => {
    setShowDropdown(true);
    setSelectedRegion('');
    setRegionData([]);
  };



  
  return (
    <div className="App" >
      <div className='topPanel'>
        <Navigate />
      </div>
      <div className='workingspace'>
        
        <div className="dropdown-container">
          {showDropdown && (
            <div className="dropdown">
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
              <h2 className="selected-region">{selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th data-field="F.no">F.no</th>
                    <th data-field="Farmer name">Farmer Name</th>
                    <th data-field="Requirement">Requirement</th>
                    <th data-field="Quantity">Quantity</th>
                    <th data-field="Status">Status</th>
                    <th data-field="Ph.no">Ph.no</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((row, index) => (
                    <tr key={index}>
                      <td data-field="F.no" contentEditable={isEditing}>{row['F.no']}</td>
                      <td data-field="Farmer name" contentEditable={isEditing}>{row['Farmer name']}</td>
                      <td data-field="Requirement" contentEditable={isEditing}>{row.Requirement}</td>
                      <td data-field="Quantity" contentEditable={isEditing}>{row.Quantity}</td>
                      <td data-field="Status" contentEditable={isEditing}>{row.Status}</td>
                      <td data-field="Ph.no" contentEditable={isEditing}>{row['Ph.no']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="button-container">
                <button onClick={addRow} className="add-row-button">
                  +
                </button>
                <button onClick={updateData} className="update-button">
                  {isEditing ? 'Save' : 'Edit'}
                </button>
                <Link to="/previous" onClick={showDropdownAgain} className="previous-page">
                  Previous Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <p>&copy; 2024 Krishi Bharat. All rights reserved.</p>
        <p>Contact: support@krishibharat.gov</p>
        <p>For any inquiries, <a href="mailto:support@krishibharat.gov">contact us</a>.</p>
      </div>
    </div>
  );
}

export default App;