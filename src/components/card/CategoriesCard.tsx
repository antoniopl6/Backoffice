'use client';
// Chakra imports
import {
  Flex,
  useColorModeValue,
  Text,
  Icon,
  Checkbox,
  useDisclosure
} from '@chakra-ui/react';
import Card from '@/components/card/Card';
import { IoMdTime } from 'react-icons/io';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import ComponentEdit from '@/components/menu/ComponentEdit';
import ComponentForm from '@/components/menu/ComponentForm';
import { IoIosWarning } from "react-icons/io";
import { FaCheckSquare } from "react-icons/fa";
import TextComponent from "./textComponent"
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Default(props: any) {
  const router = useRouter();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOnSearch, category, categories, categoryId, handleRemoveCategory, handleChangeCategory, setSearchQuery } = props;
  let alertTitle = "";
  const textColor = useColorModeValue('black', 'white');
  const gray = useColorModeValue('gray.500', 'white');
  const emptyFields = [];

  if (category.subcategories.length == 0 && !category.CategoryContent) {
    emptyFields.push("CategoryContent");
  }
  if (!category.CategoryId) {
    emptyFields.push("CategoryId");
  }
  if (!category.CategorySummary) {
    emptyFields.push("CategorySummary");
  }
  const [isEditFormOpen, setEditFormOpen] = useState(false);

  if (emptyFields.length > 0) {
    alertTitle = `Some fields are not specified: ${emptyFields.join(', ')}. Please make sure to fill all required fields.`;
  } else {
    alertTitle = "";
  }
  const [isHovered, setIsHovered] = useState(false);
  const categoryIdArray = router.query.path
    ? (Array.isArray(router.query.path)
      ? router.query.path.join(',')
      : router.query.path) + ","
    : "";

  const textContainerRef = useRef<HTMLDivElement>(null);
  const [truncateText, setTruncateText] = useState(false);
  const [truncatedCategoryId, setTruncatedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (textContainerRef.current && category.CategoryId) {
        const container = textContainerRef.current;
        const text = category.CategoryId;

        if (container.scrollWidth > container.clientWidth) {
          setTruncateText(true);

          const maxChars = Math.floor(container.clientWidth / measureCharacterWidth('W'));
          if (maxChars < text.length) {
            const truncatedText = text.substring(0, maxChars) + '...';
            setTruncatedCategoryId(truncatedText);
          }
        } else {
          setTruncateText(false);
          setTruncatedCategoryId(null);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      setTruncateText(false);
      setTruncatedCategoryId(null);
      window.removeEventListener('resize', handleResize);
    };
  }, [category.CategoryId]);

  const measureCharacterWidth = (character: string): number => {
    const dummyElement = document.createElement('span');
    dummyElement.textContent = character;
    document.body.appendChild(dummyElement);
    const width = dummyElement.offsetWidth;
    dummyElement.remove();
    return width;
  };

  const calculatePath = (currentCategories: any, currentPath = ''): string | null => {
    for (let i = 0; i < currentCategories.length; i++) {
      const currentCategory = currentCategories[i];
      if (currentCategory.key === category.key) {
        return currentPath + i;
      }
      if (currentCategory.subcategories && currentCategory.subcategories.length > 0) {
        const subcategoryPath = calculatePath(currentCategory.subcategories, currentPath + i + ',');
        if (subcategoryPath !== null) {
          return subcategoryPath;
        }
      }
    }
    return null;
  };

  const handleCardClick = () => {
    if (!isOnSearch) {
      router.push(`/categories?path=${categoryIdArray + categoryId}`);
    } else {
      const pathCategory = calculatePath(categories);
      if (pathCategory) {
        router.push(`/categories?path=${pathCategory}`);
        setSearchQuery('');
      } else {
        console.error('Category not found in the hierarchy.');
      }
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: isOpen1 ? 1 : 'auto' }}>

      <Card py="32px" px="32px"
        className='card-component'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: 'transform 0.3s ease-in-out',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}>
        <Flex
          my="auto"
          h="100%"
          direction={'column'}
          align={{ base: 'center', xl: 'start' }}
          justify={{ base: 'center', xl: 'center' }}

        >
          <Flex
            align="center"
            justify={'space-between'}
            w="89%"
            onClick={handleCardClick}
            mb="18px"
            style={{
              cursor: 'pointer',
              paddingRight: '30px'
            }}
            className="sliding-text-container"
            ref={textContainerRef}
          >
            {category.CategoryId ? (
              <Text fontSize="lg" color={textColor} fontWeight="700">
                {truncateText ? (
                  !isHovered ? truncatedCategoryId
                    : <span className={`sliding-text ${isHovered ? 'hovered' : ''}`}>
                      {category.CategoryId}
                    </span>
                ) : category.CategoryId
                }
              </Text>
            ) : (
              <Text fontSize="lg" color={textColor} opacity={0.7} fontWeight="700">

                CategoryId not defined

              </Text>
            )}
            <Icon
              w="18px"
              h="18px"
              title={alertTitle || "Valid Category."}
              as={alertTitle ? IoIosWarning : FaCheckSquare}
              color={alertTitle ? "orange.500" : "green.500"}
              position="absolute"
              right="30px"
            />
          </Flex>
          <Flex align="center" justify={'space-between'} w="100%" mb="18px" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            {category.CategorySummary ? (
              <Text fontSize="sm" color={textColor} overflow="hidden" fontWeight="100" maxWidth="40ch">
                {
                  category.CategorySummary.length > 250 ?
                    category.CategorySummary.substring(0, 250) + '...' : category.CategorySummary
                }
              </Text>
            ) : (
              <Text fontSize="sm" color={textColor} opacity={0.7} fontWeight="100">
                Please specify the summary
              </Text>
            )}
          </Flex>
          <Flex w="100%" align="center" justify="space-between">
            <Flex align="center">
              <Text fontSize="sm" color={textColor} fontWeight="100">
                {category.AnswerType}
              </Text>
            </Flex>
            <ComponentEdit
              display="flex"
              alignItems="center"
              justifyContent="center"
              maxH="max-content"
              category={category}
              handleRemoveCategory={handleRemoveCategory}
              setFormOpen={setEditFormOpen}
              isOpen={isOpen1}
              onOpen={onOpen1}
              onClose={onClose1}
              icon={
                <Icon
                  w="24px"
                  h="24px"
                  mb="-5px"
                  as={IoEllipsisHorizontal}
                  color={gray}
                  fill={gray}
                />
              }
            />
          </Flex>
        </Flex>
      </Card>
      <ComponentForm
        category={category}
        isOpen={isEditFormOpen}
        setOpen={setEditFormOpen}
        handleRemoveCategory={handleRemoveCategory}
        handleChangeCategory={handleChangeCategory}
      />
    </div>
  );
}
