import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TshirtProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the JSON data from the public folder
        const response = await fetch('./assets/Tshirt.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setProducts(data); // Set the products from the JSON data
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    };

  fetchData();
  }, []);

  const handleImageClick = (product) => {
    // Navigate to the gallery page and pass the entire product data
    navigate('/design', { state: { product } });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleImageClick(product)}
          >
            <img
              src={product.item}
              alt={`Product ${product.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
              {product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TshirtProduct;
