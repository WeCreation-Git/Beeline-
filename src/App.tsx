import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Carousel from './components/sections/Carousel';
import WhyUs from './components/sections/WhyUs';
import Services from './components/sections/Services';
import Reviews from './components/sections/Reviews';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import BookingPage from './components/sections/BookingPage';
import Loader from "./Loader";
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., fetch, images, etc.)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <section id="home">
                  <Carousel />
                </section>
                <WhyUs />
                <section id="services">
                  <Services />
                </section>
                <Reviews />
                <ContactSection />
              </main>
              <Footer />
            </>
          } />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
