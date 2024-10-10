// DraggableWrapper.js
// import React from 'react';
import Draggable from 'react-draggable';

const DraggableWrapper = ({ id, handleDrag, children }) => {
  return (
    <Draggable
      onDrag={(e, data) => handleDrag(id, e, data)}
    >
      {children}
    </Draggable>
  );
};

export default DraggableWrapper;
