import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IntroSection from "../components/Intro";
import FeatureSection from "../components/Features";
import WorkflowPage from "../components/Workflow";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <IntroSection />
        <FeatureSection />
        <WorkflowPage />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;