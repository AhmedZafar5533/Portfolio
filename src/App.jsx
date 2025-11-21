
import './App.css'
import MainPage from './pages/portfolio/assemble'
import SmoothScroll from './components/SmoothScroll'
import MagneticCursor from './components/MagneticCursor'

function App() {
  return (
    <SmoothScroll>
      <MagneticCursor />
      <MainPage />
    </SmoothScroll>
  )
}

export default App
