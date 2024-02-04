import { useDrop } from 'react-dnd';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';

const DropArea = () => {
  const [droppedButtons, setDroppedButtons] = useState([]);

  const handleDrop = (item) => {
    if (item.position) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.position.x + delta.x);
      const top = Math.round(item.position.y + delta.y);
      moveButton(item.id, { x: left, y: top });
    }
  };

  const moveButton = (id, delta) => {
    setDroppedButtons((prevButtons) =>
      prevButtons.map((button) => (button.id === id ? { ...button, position: delta } : button))
    );
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'BUTTON',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.position.x + delta.x);
      const top = Math.round(item.position.y + delta.y);
      moveButton(item.id, { x: left, y: top });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      ref={drop}
      borderWidth="1px"
      borderRadius="md"
      p="20px" // Increased padding for a larger drop area
      backgroundColor={isOver ? 'lightgreen' : 'white'}
      position="relative"
      width="400px" // Set the width
      height="300px" // Set the height
    >
      {droppedButtons.map((button) => (
        <Box
          key={button.id}
          position="absolute"
          left={`${button.position.x}px`}
          top={`${button.position.y}px`}
        >
          {button.text}
        </Box>
      ))}
    </Box>
  );
};

export default DropArea;
