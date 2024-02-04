import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Text,
  Flex,
  Input,
  Select,
  AlertIcon,
  Alert,
  useColorModeValue
} from '@chakra-ui/react'; // Make sure to import Chakra UI components

import { PlaceSpace } from './PlaceSpace';
import { SelectSpace } from './SelectSpace';
import Card from '@/components/card/Card';
import CategoriesCard from '@/components/card/CategoriesCard';
import { SearchBar } from '@/components/search';
import { MdApps, MdDashboard } from 'react-icons/md';
import { BiAddToQueue } from "react-icons/bi";

export function Transactions() {
  const topBarHeight = 250;
  const sideBarWidth = 50;
  const textColor = useColorModeValue('navy.700', 'white');
  const buttonBg = useColorModeValue('transparent', 'navy.800');
  const [uploadStatus, setUploadStatus] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const hoverButton = useColorModeValue(
    { bg: 'gray.100' },
    { bg: 'whiteAlpha.100' },
  );
  const activeButton = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.200' },
  );
  const [nameFile, setNameFile] = useState('newTransaction');
  const [sumPrompt, setSumPrompt] = useState('');
  const [componentsConfig, setComponentsConfig] = useState([]);
  const [lines, setLines] = useState([]);
  const [components, setComponents] = useState([]);
  const apiEndpoint = 'https://dev-labs-api.komsai.com/backoffice/transactions';

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(apiEndpoint + '?clientId=labs', {
        method: 'GET',
        headers: {
          'x-api-key': 'TCBrcNgHl4RXldG7EmLnmp4Y7cfBXtAvaTEU644p-dlabs'
        },
      });

      if (response.ok) {
        const data = await response.json();
        let { nameFile, componentsConfig, components, lines, sumPrompt } = data;
        lines = lines.map(line => ({
          ...line,
          start: {
            ...line.start,
            pos: {
              ...line.start.pos,
              x: line.start.pos.x + sideBarWidth,
              y: line.start.pos.y + topBarHeight
            }
          },
          end: {
            ...line.end,
            pos: {
              ...line.end.pos,
              x: line.end.pos.x + sideBarWidth,
              y: line.end.pos.y + topBarHeight
            }
          }
        }));
        components = components.map(component => ({
          ...component,
          pos: {
            ...component.pos,
            x: component.pos.x + sideBarWidth,
            y: component.pos.y + topBarHeight
          }
        }));
        setNameFile(nameFile);
        setComponentsConfig(componentsConfig);
        setComponents(components);
        setLines(lines);
        setSumPrompt(sumPrompt);
      } else {
        setNameFile("newTransaction");
        setComponentsConfig([]);
        setComponents([]);
        setLines([]);
        setSumPrompt("");
      }
    } catch (error) {
      console.log("Error to access to the API " + error);
    }
  };

  React.useEffect(() => {
    fetchDataFromApi();
  }, []);

  // Update cookies when input values change
  const handleNameFileChange = (e) => {
    const newValue = e.target.value;
    setNameFile(newValue);
    //cookies.set('nameFile', newValue, { path: '/' , maxAge: 31536000});
  };

  const handleSumPromptChange = (e) => {
    const newValue = e.target.value;
    setSumPrompt(newValue);
    //cookies.set('sumPrompt', newValue, { path: '/' , maxAge: 31536000});
  };
  async function onSubmit() {
    try {
      const json = {
        "componentsConfig": componentsConfig,
        "lines": lines,
        "nameFile": nameFile,
        "sumPrompt": sumPrompt
      }
      const response = await fetch(apiEndpoint + '?clientId=labs', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
          'x-api-key': 'TCBrcNgHl4RXldG7EmLnmp4Y7cfBXtAvaTEU644p-dlabs'
        },
      });

      if (response.ok) {
        setUploadStatus('Transactions saved successfully');
        setShowSuccessAlert(true);
      } else {
        setUploadStatus('Failed to save transactions, please try again');
        setShowErrorAlert(true);
      }
    } catch (error) {
      setUploadStatus('Failed to save changes: ' + error.message);
      setShowErrorAlert(true);
    }
    setTimeout(() => {
      setShowSuccessAlert(false);
      setShowErrorAlert(false);
    }, 3000);
  };
  return (
    <>
      <Card w="100%" mb="20px">
        <Flex align="center" direction={{ base: 'column', md: 'row' }}>
          <Text fontSize="lg" fontWeight={'700'}>
            All Transactions
          </Text>
          <Button
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            ms="auto"
            mt={{ base: '20px', md: '0px' }}
            w={{ base: '100%', md: '210px' }}
            h="54px"
            onClick={onSubmit}
          >
            Save changes
          </Button>
        </Flex>
      </Card>
      <Flex w="100%" mb="20px" direction={{ base: 'column', md: 'row' }}>
        <Input
          fontSize="sm"
          id="edit_product"
          variant="main"
          h="44px"
          maxH="44px"
          value={nameFile}
          onChange={handleNameFileChange}
          mt={{ base: '20px', md: '0px' }}
          me={{ base: '10px', md: '20px' }}
          placeholder='File Name'
          _placeholder={{
            alpha: 0.5
          }}
        />
        <Input
          fontSize="sm"
          id="edit_product"
          variant="main"
          h="44px"
          maxH="44px"
          value={sumPrompt}
          onChange={handleSumPromptChange}
          mt={{ base: '20px', md: '0px' }}
          me={{ base: '10px', md: '20px' }}
          placeholder='Summarization prompt'
          _placeholder={{
            alpha: 0.5
          }}
        />
      </Flex>
      <div className='Transactions'>
        <div class="container2">
          <div className="space-select-components">
            <SelectSpace
              nameFile={nameFile}
              setNameFile={setNameFile}
              sumPrompt={sumPrompt}
              setSumPrompt={setSumPrompt}
              componentsConfig={componentsConfig}
              setComponentsConfig={setComponentsConfig}
              lines={lines}
              setLines={setLines}
              components={components}
              setComponents={setComponents}
            />
          </div>
          <div id='space-hold-components' className='space-hold-components'>
            <PlaceSpace
              componentsConfig={componentsConfig}
              setComponentsConfig={setComponentsConfig}
              lines={lines}
              setLines={setLines}
              components={components}
              setComponents={setComponents}
            />
          </div>
        </div>
        {showSuccessAlert && (
          <div className="alert-container success">
            <Alert status="success">
              <AlertIcon />
              {uploadStatus}
            </Alert>
          </div>
        )}
        {showErrorAlert && (
          <div className="alert-container error">
            <Alert status="error">
              <AlertIcon />
              {uploadStatus}
            </Alert>
          </div>
        )}
      </div>
    </>
  );
}
