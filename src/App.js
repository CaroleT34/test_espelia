import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [buildings, setBuildings] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    fetch("https://test-api.espedata.fr/index.php/api/buildings?page="+page)
    .then(response => response.json())
    .then(data => setBuildings(data))
  }, [page]);
  return (
    <div className="App">
      <table>
        <thead>
            <tr>
              <th>id</th>
              <th>picture</th>
              <th>buildingName</th>
              <th>streetNumber</th>
              <th>streetName</th>
              <th>postcode</th>
              <th>city</th>
              <th>country</th>
              <th>latitude</th>
              <th>longitude</th>
              <th>constructionDate</th>
              <th>commentary</th>
            </tr>
        </thead>
        <tbody>
          {buildings && buildings["hydra:member"].map(building => (
            <tr key={building.id}>
              <td className="paddingH25">{building.id}</td>
              <td>
                <img className="picture" src={building.picture} alt="image du bâtiment"/>
              </td>
              <td>{building.buildingName}</td>
              <td>{building.streetNumber}</td>
              <td>{building.streetName}</td>
              <td>{building.postcode}</td>
              <td>{building.city}</td>
              <td>{building.country}</td>
              <td>{building.latitude}</td>
              <td>{building.longitude}</td>
              <td>{building.constructionDate}</td>
              <td>{building.commentary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {buildings && buildings["hydra:view"]["@id"] !== buildings["hydra:view"]["hydra:first"] && <button onClick={() => setPage(page-1)}> Page précédente </button>}
      {buildings && buildings["hydra:view"]["@id"] !== buildings["hydra:view"]["hydra:last"] && <button onClick={() => setPage(page+1)}> Page suivante </button>}
    
    </div>
  );
}

export default App;
