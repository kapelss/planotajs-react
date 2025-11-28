import './App.css';
import { useState } from 'react';

function App() {
  // Stāvoklis, lai izsekotu pašreizējo ievades lauka vērtību
  const [ievade, setIevade] = useState('');
  
  // Stāvoklis, lai saglabātu visu uzdevumu masīvu
  const [uzdevumi, setUzdevumi] = useState([]);

  // Stāvoklis rediģēšanai
  const [redigejamsIdx, setRedigejamsIdx] = useState(null);
  const [redigejamaisTeksts, setRedigejamaisTeksts] = useState('');

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

  // Sāk uzdevuma rediģēšanu
  function saktRedigesanu(idx) {
    setRedigejamsIdx(idx);
    setRedigejamaisTeksts(uzdevumi[idx]);
  }

  // Saglabā rediģēto uzdevumu
  function saglabatRedigesanu() {
    if (redigejamaisTeksts.trim() !== '') {
      const jaunsUzdevums = [...uzdevumi];
      jaunsUzdevums[redigejamsIdx] = redigejamaisTeksts;
      setUzdevumi(jaunsUzdevums);
      setRedigejamsIdx(null);
      setRedigejamaisTeksts('');
    }
  }

  // Atceļ rediģēšanu
  function atceltRedigesanu() {
    setRedigejamsIdx(null);
    setRedigejamaisTeksts('');
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

  function dzest(idx) {
    // Izveido kopiju masīvam
    const jaunsUzdevums = [...uzdevumi];
    // Izdzēš uzdevumu ar ideksu idx, izmantojot splice metodi
    jaunsUzdevums.splice(idx, 1);
    // Atjaunina stāvokli ar jauno masīvu
    setUzdevumi(jaunsUzdevums);
  }
  
  // Renderē HTML elementus lapā
  return (
    <>
    <h1>Plānotājs izmantojot React.jsx</h1> 
    <div>
      <input
       type="text" 
       required placeholder='Ievadi uzdevumu...' 
       value={ievade}
       // Atjaunina stāvokli pie katras ievades izmaiņas
       onChange={function(e) { setIevade(e.target.value); }}
       onKeyPress={function(e) {
        if (e.key === 'Enter') {
          pievienotUzdevumu();
        }
       }}></input>
      <button className='pievienot-btn' onClick={pievienotUzdevumu}>Pievienot</button> 
    </div>
    <div>
      <ul>
        {/* Iziet cauri uzdevumu masīvam, lai renderētu katru uzdevumu kā saraksta elementu */}
        {uzdevumi.map(function(uzd, idx) {
          return (
            <li key={idx}>
              {redigejamsIdx === idx ? (
                // Rediģēšanas režīms
                <>  
                  <input
                    type="text"
                    value={redigejamaisTeksts}
                    onChange={function(e) { setRedigejamaisTeksts(e.target.value); }}
                    onKeyPress={function(e) {
                      if (e.key === 'Enter') {
                        saglabatRedigesanu();
                      }
                    }}
                  />
                  <button 
                    className='move-btn' 
                    onClick={saglabatRedigesanu}
                  >
                    ✅
                  </button>
                  <button 
                    className='move-btn' 
                    onClick={atceltRedigesanu}
                  >
                    ❌
                  </button>
                </>
              ) : (
                // Parādīšanas režīms
                <>
                  <span>{uzd}</span>
                  <span className='button-group'>
                    <button
                    className='move-btn'
                    onClick={function() { dzest(idx); }}
                    >
                      🗑️
                    </button>
                    <button
                      className='move-btn'
                      onClick={function() { saktRedigesanu(idx); }}
                    >
                      ✏️
                    </button>
                    <button className='move-btn'
                      onClick={function() { augstak(idx); }}
                      // Atspējo pogu, ja uzdevums jau ir  pašā augšā
                      disabled={idx === 0}
                    >
                      👆
                    </button>
                    <button
                      className='move-btn'
                      onClick={function() { zemak(idx); }}
                      // Atspējo pogu, ja uzdevums jau ir apakšā
                      disabled={idx === uzdevumi.length - 1}
                    >
                      👇
                    </button>
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
    </>
  )
}

export default App