import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CapProduct = () => {
  const [variants, setVariants] = useState([]);
  const [capParts, setCapParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./assets/CapData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVariants(data.variants);  // Adjusted to match new JSON structure
        setCapParts(data.capParts);
      } catch (error) {
        setError('Failed to fetch cap data.');
        console.error('Error fetching JSON:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (index) => {
    navigate('/capcustomizer', { state: { capPart: capParts[index], mainImage: variants[index].mainImage } });
  };

  if (loading) {
    return <div className="text-center py-7">Loading cap products...</div>;
  }

  if (error) {
    return <div className="text-center py-7 text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className='text-center py-7 bg-gray-400 text-6xl'>Cap Products</h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Display main images */}
          {variants.map((variants, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={variants.mainImage}
                  alt={`Cap Main Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CapProduct;
