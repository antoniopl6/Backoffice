import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useColorModeValue,
  Box,
  Icon,
  Flex,
  Text
} from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa";
import Card from '@/components/card/Card';
const ModelOptions = ['ChatGPT', 'ChatGPT4', 'ChatGPT16', 'Finetune', 'Davinci'];

export function GenericAnswers() {
  const textColor = useColorModeValue('gray.500', 'white');
  const [fileName, setFileName] = useState('formData');
  const [formData, setFormData] = useState({
    model: ModelOptions[0],
    temperature: 1.0,
    max_tokens: 50,
    top_p: 0,
    frequency_penalty: 1.0,
    presence_penalty: 1.0,
    messages: []
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var newMessages = formData.messages.map((message) => {
      if (message.role === 'custom') {
        return { role: message.customRole };
      } else {
        return { role: message.role, content: message.content };
      }
    });
    const updatedFormData = { ...formData, messages: newMessages };
    const jsonData = JSON.stringify(updatedFormData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    // Create a FormData object, it is the data sended to the API
    const formDataForAPI = new FormData();
    formDataForAPI.append('file', blob, fileName + '.json');
    formDataForAPI.append('bucketName', 'cyanswers');

    //POST to the API to save json file (S3)
    fetch('http://localhost:3000/saveFileToS3', {
      method: 'POST',
      body: formDataForAPI,
    })
      .then((response) => {
        if (response.ok) {
          console.log('JSON data saved to S3 successfully');
        } else {
          console.error('Failed to save JSON data to S3');
        }
      })
      .catch((error) => {
        console.error('Error while saving JSON data:', error);
      });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addMessage = () => {
    const newMessage = { role: 'system', customRole: '', content: '' };  // Default role is 'system'
    setFormData({
      ...formData,
      messages: [...formData.messages, newMessage]
    });
  };

  const handleMessageChange = (event, index) => {
    const { name, value } = event.target;
    const updatedMessages = [...formData.messages];
    //Update updatedMessages on content or role field based on name
    updatedMessages[index][name.split('-')[0]] = value;
    setFormData({
      ...formData,
      messages: updatedMessages
    });
  };

  const handleMessageDelete = (index) => {
    const updatedMessages = formData.messages.slice();
    updatedMessages.splice(index, 1);
    setFormData({
      ...formData,
      messages: updatedMessages
    });
  };
  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  return (
    <div>
      <Card w="100%" mb="20px">
        <Flex align="center" direction={{ base: 'column', md: 'row' }}>
          <Text fontSize="lg" fontWeight={'700'}>
            Chat Configuration
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
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </Flex>
      </Card>
      <form>
        <FormControl>
          <FormLabel for="fileName">File Name: </FormLabel>
          <Input
            type="text"
            name="fileName"
            id="fileName"
            value={fileName}
            onChange={handleFileNameChange}
            color={textColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel for="model">Select Model: </FormLabel>
          <Select name="model" id="model" value={formData.model} onChange={handleInputChange} color={textColor}>
            {ModelOptions.map((model, index) => (
              <option key={index} value={model} style={{backgroundColor: "white"}}>
                {model}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel for="temperature">Temperature: </FormLabel>
          <Input type="number" name="temperature" id="temperature" color={textColor} value={formData.temperature} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel for="max_tokens">max_tokens: </FormLabel>
          <Input type="number" name="max_tokens" id="max_tokens" color={textColor} value={formData.max_tokens} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel for="top_p">top_p: </FormLabel>
          <Input type="number" name="top_p" id="top_p" color={textColor} value={formData.top_p} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel for="frequency_penalty">frequency_penalty: </FormLabel>
          <Input type="number" name="frequency_penalty" color={textColor} id="frequency_penalty" value={formData.frequency_penalty} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel for="presence_penalty">presence_penalty: </FormLabel>
          <Input type="number" name="presence_penalty" id="presence_penalty" color={textColor} value={formData.presence_penalty} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <Button type="button" color="info" onClick={addMessage}>Add Message</Button>
          {formData.messages.map((message, index) => (
            <div key={index} className="message-container">
              <FormControl>
                <FormLabel htmlFor={`role-${index}`}>Role: </FormLabel>
                <Select
                  name={`role-${index}`}
                  value={message.role}
                  onChange={(event) => handleMessageChange(event, index)}
                >
                  <option value="system" style={{backgroundColor: "white"}}>System</option>
                  <option value="user" style={{backgroundColor: "white"}}>User</option>
                  <option value="assistance" style={{backgroundColor: "white"}}>Assistance</option>
                  <option value="custom" style={{backgroundColor: "white"}}>Custom</option>
                </Select>
              </FormControl>
              {message.role === 'custom' && (
                <FormControl>
                  <FormLabel htmlFor={`customRole-${index}`}>
                    Custom role:{' '}
                  </FormLabel>
                  <Input
                    type="text"
                    name={`customRole-${index}`}
                    color={textColor}
                    value={message.customRole}
                    onChange={(event) => handleMessageChange(event, index)}
                  />
                </FormControl>
              )}
              {message.role !== 'custom' && (
                <FormControl>
                  <FormLabel htmlFor={`content-${index}`}>Content: </FormLabel>
                  <Input
                    type="text"
                    name={`content-${index}`}
                    color={textColor}
                    value={message.content}
                    onChange={(event) => handleMessageChange(event, index)}
                  />
                </FormControl>
              )}
              <Button
                colorScheme="danger"
                onClick={() => handleMessageDelete(index)}
                name={`button-delete-${index}`}
              >
                <Icon as={FaTrash} color={textColor} h="16px" w="16px" me="8px" />
              </Button>
            </div>
          ))}
        </FormControl>
      </form>
    </div>
  );
}