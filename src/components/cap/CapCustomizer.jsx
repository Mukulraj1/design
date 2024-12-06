import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cap.css';

const CapCustomizer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mainImage } = location.state || {};

  const [capData, setCapData] = useState(null);
  const [selectedColors, setSelectedColors] = useState({
    base: mainImage || '',
    crown: '',
    peak: '',
    sandwich: '',
    topButton: ''
  });
  const [activePart, setActivePart] = useState('');
  const [sidebarImages, setSidebarImages] = useState([]);

  useEffect(() => {
    fetch('/assets/CapData.json')
      .then((response) => response.json())
      .then((data) => {
        setCapData(data);
        const variant = data.variants.find(variant => variant.mainImage === mainImage);
        setSidebarImages(variant ? variant.sidebarImages : []);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, [mainImage]);

  const handleColorChange = (partName, image) => {
    setSelectedColors(prevColors => ({
      ...prevColors,
      [partName]: image
    }));
    setActivePart('');
  };

  const handleImageClick = (partName) => {
    setActivePart(partName);
  };

  const handleSidebarImageClick = (image) => {
    setSelectedColors(prevColors => ({
      ...prevColors,
      base: image
    }));
  };

  const handleCustomizeClick = () => {
    const product = {
      mainImage: selectedColors.base,
      sidebarImages: mainImage.sidebarImages, // Include sidebar images associated with the main image
      variants: [
        { partName: 'crown', image: selectedColors.crown },
        { partName: 'peak', image: selectedColors.peak },
        { partName: 'sandwich', image: selectedColors.sandwich },
        { partName: 'topButton', image: selectedColors.topButton }
      ].filter(part => part.image)
    };

    // Navigate to the design page with the product state
    navigate('/design', { state: { product } });
  };

  if (!capData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container cap-customizer">
      <div className="sidebar-images" style={{ marginTop: '20px' }}>
        {sidebarImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Sidebar ${index}`} 
            style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }} 
            onClick={() => handleSidebarImageClick(image)} // Handle click to change main image
          />
        ))}
      </div>
      <div className="  cap-preview" style={{ position: 'relative', width: '300px', height: '400px' }}>
        <img 
          src={selectedColors.base} 
          alt="Base" 
          className="cap-part base" 
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} 
        />
        
        {selectedColors.crown && (
          <img src={selectedColors.crown} alt="Crown" className=" cap-part crown" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} />
        )}
        {selectedColors.peak && (
          <img src={selectedColors.peak} alt="Peak" className="cap-part peak" style={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }} />
        )}
        {selectedColors.sandwich && (
          <img src={selectedColors.sandwich} alt="Sandwich" className="cap-part sandwich" style={{ position: 'absolute', top: 0, left: 0, zIndex: 4 }} />
        )}
        {selectedColors.topButton && (
          <img src={selectedColors.topButton} alt="Top Button" className="cap-part topButton" style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }} />
        )}
      </div>

      <div className="container customization-controls">
        <h2>Select parts to change color</h2>
        <div className="part-selection">
          {capData.capParts.map(part => (
            <div key={part.partName} className="part-section">
              <button 
                onClick={() => handleImageClick(part.partName)} 
                className="select-part-button"
              >
                {part.partName.charAt(0).toUpperCase() + part.partName.slice(1)} Color
              </button>

              {activePart === part.partName && (
                <div className="color-options">
                  {part.colors.map(color => (
                    <button
                      key={color.value}
                      style={{ backgroundColor: color.value, margin: '5px', cursor: 'pointer', width: '20px', height: '20px', border: 'none', borderRadius: '50%' }}
                      onClick={() => handleColorChange(part.partName, color.image)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Customize Button */}
        <button 
          onClick={handleCustomizeClick} 
          className="w-40 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Logo & Text
        </button>
      </div>
    </div>
  );
};

export default CapCustomizer;
