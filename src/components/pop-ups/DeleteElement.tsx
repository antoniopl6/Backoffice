// DeleteElement.tsx

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
  } from '@chakra-ui/react';
  import React from 'react';
  
  interface DeleteElementProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }
  
  const DeleteElement: React.FC<DeleteElementProps> = ({ isOpen, onClose, onDelete }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this element?
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} >Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default DeleteElement;
  