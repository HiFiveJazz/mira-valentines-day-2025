import { useState } from 'react'
import Heading from './components/Heading';
import CardSlider from './components/CardSlider';
import riversideImages from './data/riverside';
import iceskatingImages from './data/ice_skating';
// import './App.css'
function App() {
  // const [count, setCount] = useState(0)

  return (
  <div>
      <Heading />
      <CardSlider images={iceskatingImages} title="Ice Skating"/>
      <CardSlider images={riversideImages} title="Riverside Lights"/>
      {/* <CardSlider images={riversideImages} title="Riverside Lights"/> */}
      {/* <CardSlider images={riversideImages} title="Riverside Lights"/> */}
  </div>
  )
}

export default App
