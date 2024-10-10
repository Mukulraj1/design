import { useState } from 'react';

const SizeChart = () => {
  // State to control the visibility of the size chart and the unit of measurement
  const [showChart, setShowChart] = useState(false);
  const [unit, setUnit] = useState('inch'); // inch or cm

  // Size chart data in inches and centimeters
  const sizeData = {
    inch: [
      { size: 'XS', chest: 32, length: 24 },
      { size: 'S', chest: 34, length: 25 },
      { size: 'M', chest: 36, length: 26 },
      { size: 'L', chest: 38, length: 27 },
      { size: 'XL', chest: 40, length: 28 },
      { size: 'XXL', chest: 42, length: 29 },
      { size: 'XXXL', chest: 44, length: 30 },
    ],
    cm: [
      { size: 'XS', chest: 81, length: 61 },
      { size: 'S', chest: 86, length: 63 },
      { size: 'M', chest: 91, length: 66 },
      { size: 'L', chest: 97, length: 69 },
      { size: 'XL', chest: 102, length: 71 },
      { size: 'XXL', chest: 107, length: 74 },
      { size: 'XXXL', chest: 112, length: 76 },
    ],
  };

  // Toggle the visibility of the size chart
  const handleSizeChartToggle = () => {
    setShowChart(!showChart);
  };

  // Set the unit (inch or cm)
  const handleUnitChange = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  return (
    
    <div>
      {/* Button to show/hide the size chart */}
      <button
        onClick={handleSizeChartToggle}
        className={`  mb-4  py-2 font-semibold underline`}
      >
        {showChart ? 'Hide Size Chart' : 'Show Size Chart'}
      </button>

      {/* Conditionally render the size chart if showChart is true */}
      {showChart && (
        <div>
          {/* Buttons to toggle between inches and centimeters */}
          <div className="mb-4">
            <button
              onClick={() => handleUnitChange('inch')}
              className={`px-4 py-2 mr-2 font-semibold rounded ${
                unit === 'inch' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-400`}
            >
              IN
            </button>
            <button
              onClick={() => handleUnitChange('cm')}
              className={`px-4 py-2 font-semibold rounded ${
                unit === 'cm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-400`}
            >
              CM
            </button>
          </div>

          {/* Table displaying the size chart */}
          <table className="sizechart min-w-full bg-white border w-[350px]">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Size</th>
                <th className="py-2 px-4 border-b">Chest ({unit === 'inch' ? 'in' : 'cm'})</th>
                <th className="py-2 px-4 border-b">Length ({unit === 'inch' ? 'in' : 'cm'})</th>
              </tr>
            </thead>
            <tbody>
              {sizeData[unit].map((item) => (
                <tr key={item.size}>
                  <td className="py-2 px-4 border-b text-center">{item.size}</td>
                  <td className="py-2 px-4 border-b text-center">{item.chest}</td>
                  <td className="py-2 px-4 border-b text-center">{item.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SizeChart;
