import { useState } from 'react'
import './App.css'
import ApparelList from './components/apparelObject'
// Import the JSON directly
import apparelDataRaw from './assets/clothing.json'; 

function App() {
  // No more useEffect or fetch needed for local files!
  const [apparelData] = useState(apparelDataRaw);

  return (
    <div className="App">
      <h1>My Digital Shop</h1>
      <div className="inventory-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {apparelData.map((item) => (
          <ApparelList key={item.id} apparelNo={item} />
        ))}
      </div>
    </div>
  )
}

export default App;