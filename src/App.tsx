import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroSection from './components/Intro';
import FeatureSection from './components/Features';
import WorkflowPage from './components/Workflow';

function App() {
  return (
      <div className='App'>
          <Navbar />
          <div className="max-w-7xl mx-auto pt-20 px-6">
            <IntroSection />
            <FeatureSection />
            <WorkflowPage />
            <Footer /> 
          </div>
      </div>
  );
}

export default App;
