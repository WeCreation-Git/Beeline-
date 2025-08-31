import { motion } from 'framer-motion';

const Reviews = () => {
  const reviews = [
    {
      name: "John Smith",
      rating: 5,
      comment: "Absolutely amazing service! My car looks brand new. The attention to detail is incredible.",
      date: "2 weeks ago",
      service: "Full Detail Package"
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Professional team and excellent results. The interior cleaning was outstanding!",
      date: "1 month ago",
      service: "Interior Treatment"
    },
    {
      name: "Mike Davis",
      rating: 5,
      comment: "Best car detailing service in town. The ceramic coating has kept my car looking perfect.",
      date: "3 weeks ago",
      service: "Exterior Protection"
    },
    {
      name: "Emily Wilson",
      rating: 5,
      comment: "Quick, efficient, and high-quality work. Will definitely be coming back!",
      date: "1 week ago",
      service: "Engine Care"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "4.9", label: "Average Rating" },
    { number: "3+", label: "Years Experience" },
    { number: "100%", label: "Satisfaction Rate" }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ratings & Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - see what our satisfied customers have to say
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "{review.comment}"
              </p>
              <div className="text-sm text-gray-500">
                <div className="font-semibold text-yellow-600">{review.service}</div>
                <div>{review.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Join Our Happy Customers!</h3>
            <p className="text-lg mb-6">
              Experience the quality service that has earned us hundreds of 5-star reviews
            </p>
            <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300">
              Book Your Service
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;