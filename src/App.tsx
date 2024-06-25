import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroSection from './components/Intro';

function App() {
  return (
      <div className='App'>
          <Navbar />
          <div className="max-w-7xl mx-auto pt-20 px-6">
            <IntroSection />
            <Footer /> 
          </div>
      </div>
  );
}

export default App;
