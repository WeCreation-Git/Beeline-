import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../utils/emailService';

interface BookingData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
  };
  serviceInfo: {
    selectedServices: string[];
    preferredDate: string;
    preferredTime: string;
    additionalNotes: string;
  };
}

const BookingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    personalInfo: { name: '', email: '', phone: '', address: '' },
    vehicleInfo: { make: '', model: '', year: '', color: '' },
    serviceInfo: { selectedServices: [], preferredDate: '', preferredTime: '', additionalNotes: '' }
  });

  const services = [
    { id: 'exterior', name: 'Exterior Protection' },
    { id: 'interior', name: 'Interior Treatment' },
    { id: 'appearance', name: 'Appearance Enhancement' },
    { id: 'antirust', name: 'Anti Rust Protection' },
    { id: 'engine', name: 'Engine Care' }
  ];

  const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];

  const handleServiceToggle = (serviceId: string) => {
    setBookingData(prev => ({
      ...prev,
      serviceInfo: {
        ...prev.serviceInfo,
        selectedServices: prev.serviceInfo.selectedServices.includes(serviceId)
          ? prev.serviceInfo.selectedServices.filter(id => id !== serviceId)
          : [...prev.serviceInfo.selectedServices, serviceId]
      }
    }));
  };

  const handleInputChange = (section: keyof BookingData, field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    sendEmail({
      to: ["beelineautohub@gmail.com"],
      subject: "New Booking Request",
      html: `
        <h2>New Service Booking</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${bookingData.personalInfo.name}</p>
        <p><strong>Email:</strong> ${bookingData.personalInfo.email}</p>
        <p><strong>Phone:</strong> ${bookingData.personalInfo.phone}</p>
        <p><strong>Address:</strong> ${bookingData.personalInfo.address}</p>
        
        <h3>Vehicle Information</h3>
        <p><strong>Vehicle:</strong> ${bookingData.vehicleInfo.year} ${bookingData.vehicleInfo.make} ${bookingData.vehicleInfo.model}</p>
        <p><strong>Color:</strong> ${bookingData.vehicleInfo.color}</p>
        
        <h3>Service Details</h3>
        <p><strong>Services:</strong> ${bookingData.serviceInfo.selectedServices.map(id => services.find(s => s.id === id)?.name).join(', ')}</p>
        <p><strong>Preferred Date:</strong> ${bookingData.serviceInfo.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${bookingData.serviceInfo.preferredTime}</p>
        <p><strong>Additional Notes:</strong> ${bookingData.serviceInfo.additionalNotes}</p>
      `,
    });
    alert('Booking submitted successfully! We will contact you soon.');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bookingData.serviceInfo.selectedServices.length > 0;
      case 2:
        const { name, email, phone } = bookingData.personalInfo;
        return name && email && phone;
      case 3:
        const { make, model, year } = bookingData.vehicleInfo;
        return make && model && year;
      case 4:
        return bookingData.serviceInfo.preferredDate && bookingData.serviceInfo.preferredTime;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="bg-yellow-500 h-2">
            <div 
              className="bg-yellow-600 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* Header */}
          <div className="p-8 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Book Your Service</h1>
                <p className="text-gray-600 mt-2">Step {currentStep} of 4</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Select Your Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        bookingData.serviceInfo.selectedServices.includes(service.id)
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 ${
                          bookingData.serviceInfo.selectedServices.includes(service.id)
                            ? 'bg-yellow-500 border-yellow-500'
                            : 'border-gray-300'
                        }`}>
                          {bookingData.serviceInfo.selectedServices.includes(service.id) && (
                            <svg className="w-4 h-4 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={bookingData.personalInfo.name}
                      onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={bookingData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={bookingData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={bookingData.personalInfo.address}
                      onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Vehicle Information */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Vehicle Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
                    <input
                      type="text"
                      value={bookingData.vehicleInfo.make}
                      onChange={(e) => handleInputChange('vehicleInfo', 'make', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="e.g., Toyota, Honda, BMW"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                    <input
                      type="text"
                      value={bookingData.vehicleInfo.model}
                      onChange={(e) => handleInputChange('vehicleInfo', 'model', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="e.g., Camry, Civic, X5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                    <input
                      type="number"
                      value={bookingData.vehicleInfo.year}
                      onChange={(e) => handleInputChange('vehicleInfo', 'year', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="e.g., 2020"
                      min="1990"
                      max="2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="text"
                      value={bookingData.vehicleInfo.color}
                      onChange={(e) => handleInputChange('vehicleInfo', 'color', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="e.g., Black, White, Red"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Schedule & Confirmation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Schedule Your Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      value={bookingData.serviceInfo.preferredDate}
                      onChange={(e) => handleInputChange('serviceInfo', 'preferredDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <select
                      value={bookingData.serviceInfo.preferredTime}
                      onChange={(e) => handleInputChange('serviceInfo', 'preferredTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={bookingData.serviceInfo.additionalNotes}
                    onChange={(e) => handleInputChange('serviceInfo', 'additionalNotes', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                    rows={4}
                    placeholder="Any special requests or additional information..."
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm text-gray-900">
                    <p><span className="font-medium">Services:</span> {bookingData.serviceInfo.selectedServices.map(id => services.find(s => s.id === id)?.name).join(', ')}</p>
                    <p><span className="font-medium">Customer:</span> {bookingData.personalInfo.name}</p>
                    <p><span className="font-medium">Vehicle:</span> {bookingData.vehicleInfo.year} {bookingData.vehicleInfo.make} {bookingData.vehicleInfo.model}</p>
                    <p><span className="font-medium">Date & Time:</span> {bookingData.serviceInfo.preferredDate} at {bookingData.serviceInfo.preferredTime}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-gray-50 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Booking
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;