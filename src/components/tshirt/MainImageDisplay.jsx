
import OverlayImage from './OverlayImage';
import TextOverlay from './TextOverlay'

const MainImageDisplay = ({
  selectedImage,
  handleImageClick,
  overlayImages = [], // Ensure overlayImages defaults to an empty array
  handleDeleteOverlay,
  handleResize,
  handleDrag,
  showIcons,
  textOverlays = [], // Ensure textOverlays defaults to an empty array
  handleDeleteTextOverlay,
  handleResizeText,
  setTextOverlays,
}) => {
  return (
    <div className=" relative w-full md:w-[350px] h-auto flex justify-center items-center  max-sm:w-[300px]">
      {/* Main selected image */}
      <div className="relative main-image">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-auto object-contain rounded-xl"
          onClick={() => handleImageClick(selectedImage)}
        />
      </div>
      

      {/* Display text overlays on the main image */}
      {textOverlays?.map((textOverlay) => ( // Use optional chaining to ensure safe mapping
        <TextOverlay
          key={textOverlay.id}
          textOverlay={textOverlay}
          setTextOverlays={setTextOverlays}
          handleDeleteTextOverlay={handleDeleteTextOverlay}
          handleResizeText={handleResizeText}
          showIcons={showIcons}
          handleDrag={handleDrag}
        />
      ))}

      {/* Display image overlays (logos, etc.) on the main image */}
      {overlayImages?.map((image) => ( // Use optional chaining to ensure safe mapping
        <OverlayImage
          key={image.id}
          image={image}
          handleDrag={handleDrag}
          handleResize={handleResize}
          handleDeleteOverlay={handleDeleteOverlay}
          showIcons={showIcons}
        />
      ))}
    </div>
  );
};

export default MainImageDisplay;
