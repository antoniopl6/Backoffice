// ComponentForm.tsx
import React, { useState, useEffect } from 'react';
import { Input, Select, Textarea, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue } from '@chakra-ui/react';
import DeleteElement from '@/components/pop-ups/DeleteElement';

const ComponentForm = (props: any) => {
  const { category, isOpen, setOpen, handleRemoveCategory, handleChangeCategory } = props;
  const [originalCategory, setOriginalCategory] = useState({ ...category });
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState({ ...category });

  useEffect(() => {
    setEditedCategory({ ...category });
  }, [isOpen]);

  const handleSaveEdit = () => {
    handleChangeCategory(editedCategory);
    // handleChangeCategory(category.key, 'CategoryId', editedCategory.CategoryId);
    // handleChangeCategory(category.key, 'AnswerType', editedCategory.AnswerType);
    // handleChangeCategory(category.key, 'CategorySummary', editedCategory.CategorySummary);
    // handleChangeCategory(category.key, 'CategoryContent', editedCategory.CategoryContent);
    handleCloseEditModal();
  };
  const textColor = useColorModeValue('gray.500', 'white');
  const textHover = useColorModeValue(
    { color: 'navy.700', bg: 'unset' },
    { color: 'gray.500', bg: 'unset' },
  );
  const bgList = useColorModeValue('white', 'whiteAlpha.100');
  const bgShadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset',
  );
  const handleCancelEdit = () => {
    handleCloseEditModal();
  };

  const handleCloseEditModal = () => {
    setOpen(false);
  };

  const handleDeleteCategory = () => {
    if (hasContent(category)) {
      // If there is content, open the delete confirmation modal
      setIsDeleteConfirmationOpen(true);
    } else {
      // If there is no content, proceed with deletion
      performDeleteCategory();
    }
  };
  const hasContent = (category: any) => {
    return (
      category.CategoryId ||
      category.CategorySummary ||
      (category.CategoryContent && category.subcategories.length == 0) ||
      category.subcategories.length > 0
    );
  };
  const performDeleteCategory = () => {
    if (handleRemoveCategory) {
      handleRemoveCategory(category.key);
    }
  };
  return (
    <>
      <Modal size="3xl" isOpen={isOpen} onClose={handleCloseEditModal} >
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>Category Id:</label>
            <Input
              type="text"
              value={editedCategory.CategoryId}
              color={textColor}
              onChange={(e) => setEditedCategory({ ...editedCategory, CategoryId: e.target.value })}
            />
            <p></p>
            <label>Answer Type:</label>
            <Select
              value={editedCategory.AnswerType}
              onChange={(e) => setEditedCategory({ ...editedCategory, AnswerType: e.target.value })}
              color={textColor}
              marginTop="4px"
            >
              <option value="GenericInfo" style={{ color: textColor }}>
                GenericInfo
              </option>
              <option value="Transactional" style={{ color: textColor }}>
                Transactional
              </option>
            </Select>
            <p></p>
            <label>Category Summary:</label>
            <Textarea
              value={editedCategory.CategorySummary}
              color={textColor}
              w="100%"
              onChange={(e) => setEditedCategory({ ...editedCategory, CategorySummary: e.target.value })}
              size="lg"
              h="150px"
              resize="vertical"
              overflowY="auto"
              paddingTop="0"
              marginTop="4px"
            />
            <p></p>
            {category.subcategories == 0 && (
              <div>
                <label>Category Content:</label>
                <Textarea
                  value={editedCategory.CategoryContent}
                  color={textColor}
                  w="100%"
                  onChange={(e) => setEditedCategory({ ...editedCategory, CategoryContent: e.target.value })}
                  size="lg"
                  h="150px"
                  resize="vertical"
                  overflowY="auto"
                  paddingTop="0"
                  marginTop="4px"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleDeleteCategory()}>
              Delete Category
            </Button>
            <Button variant="primary" mr={3} onClick={handleSaveEdit}>
              Save Changes
            </Button>
            <Button onClick={handleCancelEdit}>Discard changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteElement
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onDelete={() => { performDeleteCategory(); setIsDeleteConfirmationOpen(false); }}
      />
    </>
  );
};

export default ComponentForm;
