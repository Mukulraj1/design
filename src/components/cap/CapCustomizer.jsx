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

  useEffect(() => {
    fetch('/assets/CapData.json')
      .then((response) => response.json())
      .then((data) => {
        setCapData(data);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

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

  const handleCustomizeClick = () => {
    const product = {
      mainImage: selectedColors.base,
      variants: [
        { partName: 'crown', image: selectedColors.crown },
        { partName: 'peak', image: selectedColors.peak },
        { partName: 'sandwich', image: selectedColors.sandwich },
        { partName: 'topButton', image: selectedColors.topButton }
      ].filter(part => part.image) // Filter out any parts without selected images
    };

    // Navigate to the design page with the product state
    navigate('/design', { state: { product } });
  };

  if (!capData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cap-customizer">
      <div className="cap-preview" style={{ position: 'relative', width: '300px', height: '400px' }}>
        <img 
          src={selectedColors.base} 
          alt="Base" 
          className="cap-part base" 
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} 
        />
        
        {selectedColors.crown && (
          <img src={selectedColors.crown} alt="Crown" className="cap-part crown" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} />
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

      <div className="customization-controls">
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
                      style={{ backgroundColor: color.value, margin: '5px', cursor: 'pointer', width: '40px', height: '40px', border: 'none', borderRadius: '5px' }}
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
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Customize
        </button>
      </div>
    </div>
  );
};

export default CapCustomizer;
