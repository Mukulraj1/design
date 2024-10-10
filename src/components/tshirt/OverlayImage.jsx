// OverlayImage.js

import DraggableWrapper from './DraggableWrapper';

const OverlayImage = ({ image, handleDrag, handleResize, handleDeleteOverlay, showIcons }) => {
  const initiateResize = (e) => {
    e.preventDefault();
    const startX = e.clientX || e.touches[0].clientX; // Support for touch
    const startY = e.clientY || e.touches[0].clientY; // Support for touch

    const handleMouseMove = (moveEvent) => {
      const deltaX = (moveEvent.clientX || moveEvent.touches[0].clientX) - startX;
      const deltaY = (moveEvent.clientY || moveEvent.touches[0].clientY) - startY;
      handleResize(image.id, deltaX, deltaY);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove); // For touch
      window.removeEventListener('touchend', handleMouseUp); // For touch
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove); // For touch
    window.addEventListener('touchend', handleMouseUp); // For touch
  };

  return (
    <DraggableWrapper id={image.id} handleDrag={handleDrag}>
      <div className="absolute" style={{ width: image.width, height: image.height }}>
        <img
          src={image.url}
          alt="Overlay"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {showIcons && (
          <>
            {/* Delete Button */}
            <button
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
              onClick={() => handleDeleteOverlay(image.id)}
              onTouchStart={() => handleDeleteOverlay(image.id)} // Support for touch
            >
              &times;
            </button>

            {/* Resize Icon */}
            <div
              className="absolute bottom-1 right-1 cursor-se-resize text-white p-2 bg-blue-500 rounded-full hover:bg-blue-600"
              onMouseDown={initiateResize}
              onTouchStart={initiateResize} // Support for touch
            >
              ↘
            </div>
          </>
        )}
      </div>
    </DraggableWrapper>
  );
};

export default OverlayImage;
