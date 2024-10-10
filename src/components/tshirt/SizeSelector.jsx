import { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS
import SizeChart from './SizeChart';

const SizeSelector = () => {
  // Initial quantities for each size
  const initialQuantities = { XS: 0, S: 0, M: 0, L: 1, XL: 2, XXL: 0, XXXL: 0 };

  // State for holding the quantities and total
  const [quantities, setQuantities] = useState(initialQuantities);
  const [total, setTotal] = useState(calculateTotal(initialQuantities));

  // Function to calculate the total
  function calculateTotal(quantities) {
    return Object.values(quantities).reduce((acc, qty) => acc + parseInt(qty || 0), 0);
  }

  // Handle quantity change
  const handleQuantityChange = (e, size) => {
    const newQuantities = { ...quantities, [size]: e.target.value };
    setQuantities(newQuantities);
    setTotal(calculateTotal(newQuantities));
  };

  // Function for updating and sending email
  const handleUpdate = () => {
    const templateParams = {
      quantities: JSON.stringify(quantities),
      total: total,
    };

    emailjs.send('service_9obbi3z', 'template_9psxb61', templateParams, 'lnH6A0S1QGcPD3rGK')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Quantities updated and email sent!');
      }, (error) => {
        console.error('Failed to send email. Error: ', error);
        alert('Failed to send email. Please try again.');
      });
  };

  return (
    <div className="container size">
      <div className="sizeselector w-[400px] bg-gray-100 rounded-lg shadow-lg text-2xl max-sm:w-[300px]">
        <div className="sizenumber grid grid-cols-9 gap-4 items-center">
          {Object.keys(quantities).map((size) => (
            <div key={size} className="text-center">
              <label className="block text-sm font-medium text-gray-700">{size}</label>
              <input
                type="number"
                min="0"
                value={quantities[size]}
                onChange={(e) => handleQuantityChange(e, size)}
                className="w-16 text-center border border-gray-300 rounded-md"
              />
            </div>
          ))}

          <div className="col-span-2 text-center">
            <label className="block text-sm font-medium text-gray-700">Total</label>
            <span className="block text-lg font-bold text-gray-800">{total}</span>
          </div>

          {/* Update Button */}
          <div className="col-span-2 flex justify-center items-center">
            <button
              onClick={handleUpdate}
              className="w-[150px] mt-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
            >
              Update
            </button>
          </div>
        </div>
        {/* Size Chart */}
        <div className="w-44 text-sm pl-8">
          <SizeChart />
        </div>
      </div>
    </div>
  );
};

export default SizeSelector;
