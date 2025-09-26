import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Exterior Protection",
      description: "Complete exterior detailing with wax, polish, and ceramic coating options",
      features: ["Paint Correction", "Ceramic Coating", "Wax & Polish", "Headlight Restoration"]
    },
    {
      title: "Interior Treatment",
      description: "Deep cleaning and protection for all interior surfaces and materials",
      features: ["Deep Vacuum", "Leather Treatment", "Fabric Protection", "Dashboard Care"]
    },
    {
      title: "Appearance",
      description: "Complete aesthetic enhancement to make your car look showroom ready",
      features: ["Full Detail", "Paint Enhancement", "Chrome Polish", "Tire Shine"]
    },
    {
      title: "Anti Rust Protection",
      description: "Advanced rust prevention and treatment to protect your investment",
      features: ["Undercoating", "Rust Treatment", "Protective Coating", "Inspection"]
    },
    {
      title: "Engine Care",
      description: "Professional engine cleaning and maintenance for optimal performance",
      features: ["Engine Degreasing", "Component Cleaning", "Protective Coating", "Inspection"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive car detailing services designed to keep your vehicle in pristine condition
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center text-sm">
                {service.description}
              </p>
              <ul className="space-y-2 flex-grow">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/booking')}
                className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg transition-colors duration-300 font-semibold"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-gray-600 mb-6">
            We can create a personalized service package that fits your specific needs and budget
          </p>
          <button 
            onClick={() => navigate('/booking')}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Book Service Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;