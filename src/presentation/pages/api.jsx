import { useState, useEffect } from "react";

function RegistrarScreen() {
  const [campusData, setCampusData] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/campus")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setCampusData(data);
      })
      .catch((error) => {
        console.error("Error fetching campus data:", error);
        setError(error.toString());
      });
  }, []);

  const handleCampusChange = (e) => {
    setSelectedCampusId(e.target.value);
  };

  return (
    <div className="App">
      <h1>Fetch Like a PRO</h1>
      <div className="card">
        {error && <p>Error: {error}</p>}
        <select 
          value={selectedCampusId} 
          onChange={handleCampusChange}
          className="p-2 rounded-md w-full"
        >
          <option value="">Selecciona campus</option>
          {campusData.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default RegistrarScreen;
