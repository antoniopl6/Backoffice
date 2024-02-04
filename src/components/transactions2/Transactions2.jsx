// App.js
import React, { useState } from 'react';
import DraggableButton from './DraggableButton';
import DropArea from './DropArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function Transactions2() {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleDrop = (item) => {
    // Handle the dropped button
    setSelectedButtons((prevButtons) => [...prevButtons, item]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DraggableButton id="button1" text="Button 1" onDrop={handleDrop} />
      <DraggableButton id="button2" text="Button 2" onDrop={handleDrop} />
      <DropArea />
    </DndProvider>
  );
};

