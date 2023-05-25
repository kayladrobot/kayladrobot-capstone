import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage"
import Creative from "./pages/Creative/Creative"
import Jobs from "./pages/Jobs/Jobs";
import Navigation from "./components/Navigation/Navigation"
import CreativeProfile from "./components/CreativeProfile/CreativeProfile"
import Footer from "./components/Footer/Footer"
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/creatives" element={<Creative />} />
          <Route path="/creatives/:id" element={<CreativeProfile />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
