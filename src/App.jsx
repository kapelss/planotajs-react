import './App.css';
import { useState } from 'react';

function App() {
  // Stāvoklis, lai izsekotu pašreizējo ievades lauka vērtību
  const [ievade, setIevade] = useState('');
  
  // Stāvoklis, lai saglabātu visu uzdevumu masīvu
  const [uzdevumi, setUzdevumi] = useState([]);

  //Pievieno uzdevumu zem ievades loga
  function pievienotUzdevumu() {
    // Pievieno uzdevumu tikai ja ievade nav tukša vai tikai atstarpes
    if (ievade.trim() !== '') {
      // Pievieno jaunu uzdevumu masīvam izmantojot spread operatoru, lai saglabātu nemainīgumu
      setUzdevumi([...uzdevumi, ievade]);
      // Iztīra ievades lauku pēc pievienošanas
      setIevade('');
    }
  }

  // Pārvieto uzdevumu augstāk
  function augstak(idx) {
    // Neļauj pārvietot uzdevumu augstāk, ja uzdevumus jau ir pašā augšā
    if (idx === 0) return;
    // Izveido uzdevumu masīva kopiju
    const jaunsUzdevums = [...uzdevumi];
    // Apmaina pašreizējo uzdevumu ar to, kas ir virs tā, izmantojot array destructuring
    [jaunsUzdevums[idx - 1], jaunsUzdevums[idx]] = [jaunsUzdevums[idx], jaunsUzdevums[idx - 1]];
    // Atjaunina stāvokli ar pārkārtoto masīvu
    setUzdevumi(jaunsUzdevums);
  }
  
  //Pārvieto uzdevumu zemāk
  function zemak(idx) {
    // Neļauj pārvietot uzdevumu zemāk, ja uzdevumus jau ir pašā apakšā
    if (idx === uzdevumi.length - 1) return;
    const jaunsUzdevums = [...uzdevumi];
    // Apmaina pašreizējo uzdevumu ar to, kas ir zem tā
    [jaunsUzdevums[idx], jaunsUzdevums[idx + 1]] = [jaunsUzdevums[idx + 1], jaunsUzdevums[idx]];
    setUzdevumi(jaunsUzdevums);
  }
  
  // Renderē HTML elementus lapā
  return (
    <>
    <h1>Plānotājs izmantojot React.jsx</h1> 
    <div>
      <input
       type="text" 
       required placeholder='Ieavadi uzdevumu...' 
       value={ievade}
       // Atjaunina stāvokli pie katras ievades izmaiņas
       onChange={e => setIevade(e.target.value)}></input>
      <button className='pievienot-btn' onClick={pievienotUzdevumu}>Pievienot</button> 
    </div>
    <div>
      <ul>
        {/* Iziet cauri uzdevumu masīvam, lai renderētu katru uzdevumu kā saraksta elementu */}
        {uzdevumi.map((uzd, idx) => (
          <li key={idx}>
            <span>{uzd}</span>
          <span className='button-group'>
            <button className='move-btn'
            onClick={() => augstak(idx)}
            // Atspējo pogu, ja uzdevums jau ir augšā
            disabled={idx === 0}
            style={{ marginLeft: '5px' }}
            >
              👆
            </button>
            <button
            className='move-btn'
            onClick={() => zemak(idx)}
            // Atspējo pogu, ja uzdevums jau ir apakšā
            disabled={idx === uzdevumi.length - 1}
            style={{ marginLeft: '5px' }}
            >
              👇
            </button>
          </span>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App