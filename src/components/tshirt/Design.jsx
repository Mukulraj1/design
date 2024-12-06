import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarImages from './SidebarImages';
import MainImageDisplay from './MainImageDisplay';
import CustomizationOptions from './CustomizationOptions';
import { SketchPicker } from 'react-color';
import SizeSelector from './SizeSelector';

const Design = () => {
  const location = useLocation();
  const { product } = location.state || {};
 

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || {});
  const [selectedImage, setSelectedImage] = useState(product?.mainImage || '');
  const [sidebarImages, setSidebarImages] = useState(selectedVariant.sidebarImages || []);
  const [overlayImagesByImage, setOverlayImagesByImage] = useState({});
  const [currentOverlayImages, setCurrentOverlayImages] = useState([]);
  const [textOverlays, setTextOverlays] = useState([]);
  const [currentTextOverlays, setCurrentTextOverlays] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [currentTextId, setCurrentTextId] = useState(null);
  const [currentText, setCurrentText] = useState('');
  const [showIcons, setShowIcons] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [isEditable, setIsEditable] = useState(true);
  

 useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage);
      setSidebarImages(product.variants[0]?.sidebarImages || []);
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
        setSidebarImages(product.variants[0].sidebarImages || []);
      }
    }
  }, [product]);

  useEffect(() => {
    if (selectedVariant) {
      setSelectedImage(selectedVariant.mainImage || product?.mainImage);
      setSidebarImages(selectedVariant.sidebarImages || []);
    }
  }, [selectedVariant, product]);

  useEffect(() => {
    setCurrentOverlayImages(overlayImagesByImage[selectedImage] || []);
    setCurrentTextOverlays(textOverlays.filter(textOverlay => textOverlay.imageId === selectedImage));
  }, [selectedImage, overlayImagesByImage, textOverlays]);



  const handleColorSelection = (color) => {
    const variant = product.variants.find(v => v.color === color);
    if (variant) {
      setSelectedVariant(variant);
      setShowColorOptions(false);
    }
  };

  const handleImageClick = (image) => {
    if (selectedImage === image) {
      setShowIcons(prev => !prev);
    } else {
      setSelectedImage(image);
      setShowIcons(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newOverlay = {
        id: nextId,
        url: imageUrl,
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        isSaved: true,
      };
      const updatedOverlays = [...currentOverlayImages, newOverlay];
      setCurrentOverlayImages(updatedOverlays);
      setOverlayImagesByImage(prev => ({
        ...prev,
        [selectedImage]: updatedOverlays,
      }));
      setNextId(nextId + 1);
      setShowIcons(true);
    }
  };

  const handleDeleteOverlay = (id) => {
    const updatedOverlays = currentOverlayImages.filter(image => image.id !== id);
    setCurrentOverlayImages(updatedOverlays);
    setOverlayImagesByImage(prev => ({
      ...prev,
      [selectedImage]: updatedOverlays,
    }));
  };

  const handleResize = (id, deltaX, deltaY) => {
    if (!isEditable) return;
    setCurrentOverlayImages(currentOverlayImages.map(image => {
      if (image.id === id) {
        const newWidth = image.width + deltaX;
        const newHeight = image.height + deltaY;
        return {
          ...image,
          width: Math.max(50, Math.min(500, newWidth)),
          height: Math.max(50, Math.min(500, newHeight)),
        };
      }
      return image;
    }));
  };

  const handleDrag = (id, e, data) => {
    if (!isEditable) return;

    // Prevent moving if the overlay has been placed
    const overlay = currentOverlayImages.find(image => image.id === id);
    if (overlay && overlay.isPlaced) return;

    setCurrentOverlayImages(currentOverlayImages.map(image => {
      if (image.id === id) {
        return {
          ...image,
          x: data.x,
          y: data.y,
          isPlaced: true, // Mark as placed
        };
      }
      return image;
    }));
  };

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleTextSave = () => {
    const updatedTextOverlay = {
      id: currentTextId,
      text: currentText,
      imageId: selectedImage,
      x: 50,
      y: 50,
      fontSize: 20,
      color: textColor,
    };

    setTextOverlays((prev) =>
      prev.map(textOverlay =>
        textOverlay.id === currentTextId ? updatedTextOverlay : textOverlay
      )
    );
    setCurrentTextOverlays((prev) =>
      prev.map(textOverlay =>
        textOverlay.id === currentTextId ? updatedTextOverlay : textOverlay
      )
    );

    setIsTextEditing(false);
    setCurrentTextId(null);
    setCurrentText('');
    setShowIcons(true);
  };

  const handleSaveOverlays = () => {
    const updatedOverlays = currentOverlayImages.map(overlay => ({
      ...overlay,
      isSaved: true,
    }));

    setOverlayImagesByImage(prev => ({
      ...prev,
      [selectedImage]: updatedOverlays,
    }));

    setIsEditable(true);
    setShowIcons(false);
  };

  const handleAddText = () => {
    const newTextOverlay = {
      id: nextId,
      text: '',
      imageId: selectedImage,
      x: 50,
      y: 50,
      fontSize: 20,
      color: textColor,
    };
    setTextOverlays([...textOverlays, newTextOverlay]);
    setCurrentTextOverlays([...currentTextOverlays, newTextOverlay]);
    setCurrentTextId(nextId);
    setNextId(nextId + 1);
    setIsTextEditing(true);
    setShowIcons(true);
  };

  const handleDeleteTextOverlay = (id) => {
    setTextOverlays(textOverlays.filter(textOverlay => textOverlay.id !== id));
    setCurrentTextOverlays(currentTextOverlays.filter(textOverlay => textOverlay.id !== id));
  };

  const handleResizeText = (id, deltaX, deltaY) => {
    setTextOverlays(textOverlays.map(textOverlay => {
      if (textOverlay.id === id) {
        const newFontSize = Math.max(10, textOverlay.fontSize + deltaY);
        return { ...textOverlay, fontSize: newFontSize };
      }
      return textOverlay;
    }));
  };

  const handleTextColorSelection = (color) => {
    setTextColor(color);
    if (currentTextId !== null) {
      setTextOverlays(textOverlays.map(textOverlay => {
        if (textOverlay.id === currentTextId) {
          return { ...textOverlay, color: color };
        }
        return textOverlay;
      }));
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 cursor-pointer mt-5 p-5">
        {/* Sidebar with clickable images */}
        <div className="w-36">
          <SidebarImages
            images={sidebarImages}
            handleImageClick={handleImageClick}
          />
        </div>

        {/* Main Image Display with overlays */}
        <MainImageDisplay
          selectedImage={selectedImage}
          handleImageClick={handleImageClick}
          overlayImages={currentOverlayImages}
          handleDeleteOverlay={handleDeleteOverlay}
          handleResize={handleResize}
          handleDrag={handleDrag}
          showIcons={showIcons}
          textOverlays={textOverlays.filter(overlay => overlay.imageId === selectedImage)}
          handleDeleteTextOverlay={handleDeleteTextOverlay}
          handleResizeText={handleResizeText}
        />

        {/* Customization Options */}
        <CustomizationOptions
          handleAddText={handleAddText}
          handleFileUpload={handleFileUpload}
          handleColorSelection={handleColorSelection}
          handleTextColorSelection={handleTextColorSelection}
          handleSaveOverlays={handleSaveOverlays}
          product={product}
          showColorOptions={showColorOptions}
          setShowColorOptions={setShowColorOptions}
        />

        {/* Text Input Field (Conditional) */}
        {isTextEditing && (
          <div className="flex flex-col">
            <input
              type="text"
              value={currentText}
              onChange={handleTextChange}
              placeholder="Enter text"
              className="p-2 border rounded"
            />

            <button
              onClick={handleTextSave}
              className="button mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Text
            </button>
          </div>
        )}

        {/* Text Color Picker (Conditional) */}
        {isTextEditing && (
          <div className="mt-4">
            <button
              onClick={() => setShowTextColorPicker(prev => !prev)}
              className="button px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Change Text Color
            </button>

            {showTextColorPicker && (
              <div className="absolute mt-2 z-10">
                <SketchPicker
                  color={textColor}
                  onChange={color => handleTextColorSelection(color.hex)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-4">
        <SizeSelector />
      </div>
    </div>
  );
};

export default Design;
