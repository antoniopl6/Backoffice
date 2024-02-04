import React, { useState, useLayoutEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'; // Import Chakra UI components
import { EditIcon } from '@chakra-ui/icons';
import DeleteElement from '@/components/pop-ups/DeleteElement';

export function ConversationSelectable({
  name,
  id,
  deleteComponent,
  value,
  setStartButton,
  componentsConfig,
  setComponentsConfig,
}) {
  const textColor = useColorModeValue('gray.500', 'white');
  const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0 });
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  useLayoutEffect(() => {
    const buttonElement = document.getElementById(id);
    if (buttonElement) {
      const { offsetWidth, offsetHeight } = buttonElement;
      setButtonDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [id]);

  const [editedValues, setEditedValues] = useState(
    value || {
      type: 'Conversation',
      newName: name,
      prompt: '',
      key: id,
    }
  );

  const [newName, setName] = useState(value.newName || name);
  const [prompt, setPrompt] = useState('');
  const [key, setKey] = useState(id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDrag = (e) => {
    e.dataTransfer.setData('componentType', 'Conversation');
    e.dataTransfer.setData('componentId', key);
    e.dataTransfer.setData('buttonWidth', buttonDimensions.width);
    e.dataTransfer.setData('buttonHeight', buttonDimensions.height);
  };

  const toggleEditModal = (event) => {
    setStartButton(null);
    setName(editedValues.newName);
    setPrompt(editedValues.prompt);
    setKey(editedValues.key);
    setIsEditModalOpen(!isEditModalOpen);
  };
  const handleDeleteTransaction = (transactionId) => {
    if (hasContent(value)) {
      // If there is content, open the delete confirmation modal
      setIsDeleteConfirmationOpen(true);
    } else {
      // If there is no content, proceed with deletion
      performDeleteTransaction(transactionId);
    }
  };
  const hasContent = (editedValues) => {
    return (
      editedValues.newName ||
      editedValues.prompt
    );
  };
  const performDeleteTransaction = (transactionId) => {
    deleteComponent(transactionId);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'prompt':
        setPrompt(value);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    const editedValue = {
      type: 'Conversation',
      newName: newName,
      prompt: prompt,
      key: key,
    };
    setEditedValues(editedValue);

    const updatedComponentsConfig = componentsConfig.map((component) => {
      if (component.key === key) {
        return editedValue;
      }
      return component;
    });
    setComponentsConfig(updatedComponentsConfig);

    setIsEditModalOpen(false);
    const buttonElement = document.getElementById(id);
    if (buttonElement) {
      const { offsetWidth, offsetHeight } = buttonElement;
      setButtonDimensions({ width: offsetWidth, height: offsetHeight });
    }
  };

  return (
    <>
      <Button
        id={id}
        style={{
          position: 'relative',
          left: `${-buttonDimensions.width / 2}px`,
          top: `${-buttonDimensions.height / 2}px`,
        }}
        size="lg"
        colorScheme='blue'
        className="conversation-selectable"
        draggable
        onDragStart={handleDrag}
      >
        {newName}
        <Button
          className="edit-icon"
          colorScheme='blue'
          onClick={(event) => toggleEditModal(event)}
          leftIcon={<Icon as={EditIcon} />}
        >
          Edit
        </Button>
      </Button>
      <Modal isOpen={isEditModalOpen} onClose={toggleEditModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Conversation</ModalHeader>
          <ModalCloseButton onClick={toggleEditModal} />
          <ModalBody>
            <Input
              type="text"
              name="name"
              value={newName}
              color={textColor}
              onChange={handleInputChange}
              placeholder="Conversation Name"
            />
            <Input
              type="text"
              name="prompt"
              value={prompt}
              color={textColor}
              onChange={handleInputChange}
              placeholder="Conversation Prompt"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button colorScheme="gray" ml={3} onClick={toggleEditModal}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteTransaction(key)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteElement
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onDelete={() => { performDeleteTransaction(key); setIsDeleteConfirmationOpen(false); }}
      />
    </>
  );
}
