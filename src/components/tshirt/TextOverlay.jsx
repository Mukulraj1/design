
import DraggableWrapper from './DraggableWrapper'; // Ensure you have this component

const TextOverlay = ({
  textOverlay,
  handleDeleteTextOverlay,
  handleResizeText,
  showIcons,
  handleDrag,
}) => {
  const initiateResize = (e) => {
    e.preventDefault();
    const startY = e.clientY || e.touches[0].clientY; // Support for touch

    const handleMouseMove = (moveEvent) => {
      const deltaY = (moveEvent.clientY || moveEvent.touches[0].clientY) - startY;
      handleResizeText(textOverlay.id, 0, deltaY);
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
    <DraggableWrapper
      id={textOverlay.id}
      handleDrag={handleDrag}
    >
      <div
        className="absolute"
        style={{
          fontSize: `${textOverlay.fontSize}px`,
          color: textOverlay.color,
          left: textOverlay.x,
          top: textOverlay.y,
          zIndex: 20,
        }}
      >
        {textOverlay.text}

        {showIcons && (
          <>
            {/* Delete Button */}
            <button
              className="absolute top-11 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
              onClick={() => handleDeleteTextOverlay(textOverlay.id)}
              onTouchStart={() => handleDeleteTextOverlay(textOverlay.id)} // Support for touch
            >
              &times;
            </button>

            {/* Resize Icon */}
            <div
              className="absolute bottom-6 right-1 cursor-se-resize text-white p-2 bg-blue-500 rounded-full hover:bg-blue-600"
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

export default TextOverlay;
