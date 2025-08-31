import Navbar from './components/layout/Navbar';
import Carousel from './components/sections/Carousel';
import WhyUs from './components/sections/WhyUs';
import Services from './components/sections/Services';
import Reviews from './components/sections/Reviews';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
