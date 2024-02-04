// DraggableButton.js
import { useDrag } from 'react-dnd';

const DraggableButton = ({ id, text, onDrop }) => {
  const [, drag] = useDrag({
    type: 'BUTTON',
    item: { id, text },
  });

  return (
    <button ref={drag} style={{ cursor: 'move' }} onClick={() => onDrop({ id, text, position: { x: 0, y: 0 } })}>
      {text}
    </button>
  );
};

export default DraggableButton;
