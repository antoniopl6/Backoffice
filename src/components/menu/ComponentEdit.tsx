import { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ComponentForm from './ComponentForm';
import DeleteElement from '@/components/pop-ups/DeleteElement';

export default function Banner(props: any) {
  const {
    icon,
    handleRemoveCategory,
    category,
    setFormOpen,
    isOpen,
    onOpen,
    onClose,
    ...rest
  } = props;
  const router = useRouter();
  
  const [originalCategory, setOriginalCategory] = useState({ ...category });
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const handleEditCategory = () => {
    setOriginalCategory({ ...category });
    setFormOpen(true);
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

  const handleCloseEditModal = () => {
    setFormOpen(false);
  };

  const performDeleteCategory = () => {
    if (handleRemoveCategory) {
      handleRemoveCategory(category.key);
      onClose();
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
  //Construct the path to the component from the query path
  const categoryIdArray = router.query.path
    ? (Array.isArray(router.query.path)
        ? router.query.path.join(',')
        : router.query.path) + ","
    : "";


  return (
    <div style={{
      zIndex: 1000, 
    }}>
      <Menu isOpen={isOpen}
        onClose={onClose}
      >
        <MenuButton {...rest} onClick={onOpen}>
          {icon}
        </MenuButton>
        <MenuList
          w="150px"
          minW="unset"
          maxW="150px !important"
          border="transparent"
          backdropFilter="blur(63px)"
          bg={bgList}
          boxShadow={bgShadow}
          borderRadius="20px"
          p="15px"
        >
          <MenuItem
            onClick={handleEditCategory}
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            color={textColor}
            _hover={textHover}
            _active={{
              bg: 'transparent',
            }}
            _focus={{
              bg: 'transparent',
            }}
            mb="10px"
          >
            <Flex align="center">
              <Icon as={FaEdit} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Edit Category
              </Text>
            </Flex>
          </MenuItem>
          <MenuItem
            onClick={() => handleDeleteCategory()}
            transition="0.2s linear"
            color={textColor}
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: 'transparent',
            }}
            _focus={{
              bg: 'transparent',
            }}
          >
            <Flex align="center">
              <Icon as={MdDelete} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Delete Category
              </Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteElement
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onDelete={() => { performDeleteCategory(); setIsDeleteConfirmationOpen(false); }}
      />
    </div>
  );
}
