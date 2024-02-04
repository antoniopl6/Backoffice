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
  Select,
  Checkbox,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import DeleteElement from '@/components/pop-ups/DeleteElement';

export function IntegrationSelectable({ name, id, deleteComponent, value, setStartButton, componentsConfig, setComponentsConfig }) {
  const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0 });
  const textColor = useColorModeValue('gray.500', 'white');
  const buttonBg = useColorModeValue('transparent', 'navy.800');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const hoverButton = useColorModeValue(
    { bg: 'gray.100' },
    { bg: 'whiteAlpha.100' },
  );
  const activeButton = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.200' },
  );
  useLayoutEffect(() => {
    const buttonElement = document.getElementById(id);
    if (buttonElement) {
      const { offsetWidth, offsetHeight } = buttonElement;
      setButtonDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [id]);

  const [editedValues, setEditedValues] = useState(value || {
    type: 'Integration',
    newName: name,
    key: id,
    prompt: '',
    integrationType: 'none',
    protocol: 'http',
    host: '',
    port: '',
    username: '',
    password: '',
    selectedFilters: [],
  });

  const [newName, setName] = useState(value.newName || name);
  const [key, setKey] = useState(id);
  const [prompt, setPrompt] = useState('');
  const [integrationType, setIntegrationType] = useState('none');
  const [protocol, setProtocol] = useState('http');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDrag = (e) => {
    e.dataTransfer.setData('componentType', 'Integration');
    e.dataTransfer.setData('componentId', key);
    e.dataTransfer.setData('buttonWidth', buttonDimensions.width);
    e.dataTransfer.setData('buttonHeight', buttonDimensions.height);
  };

  const toggleEditModal = (event) => {
    //event.stopPropagation();
    setStartButton(null);
    setName(editedValues.newName);
    setKey(editedValues.key);
    setPrompt(editedValues.prompt);
    setIntegrationType(editedValues.integrationType);
    setProtocol(editedValues.protocol);
    setHost(editedValues.host);
    setPort(editedValues.port);
    setUsername(editedValues.username);
    setPassword(editedValues.password);
    setSelectedFilters(editedValues.selectedFilters)
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleIntegrationTypeChange = (event) => {
    setIntegrationType(event.target.value);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filterValue)) {
        return prevSelectedFilters.filter((filter) => filter !== filterValue);
      } else {
        return [...prevSelectedFilters, filterValue];
      }
    });
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
      case 'protocol':
        setProtocol(value);
        break;
      case 'host':
        setHost(value);
        break;
      case 'port':
        setPort(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    const editedValue = {
      type: 'Integration',
      newName: newName,
      key: key,
      prompt: prompt,
      integrationType: integrationType,
      protocol: protocol,
      host: host,
      port: port,
      username: username,
      password: password,
      selectedFilters: selectedFilters,
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

  const showHttpFields = integrationType === 'GET';

  const filterOptions = [
    { value: 'ArrivalDate', label: 'Arrival Date' },
    { value: 'ArrivalStation', label: 'Arrival Station' },
    { value: 'DepartureDate', label: 'Departure Date' },
    { value: 'DepartureStation', label: 'Departure Station' },
    { value: 'Price', label: 'Price' },
  ];
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
        className="integration-selectable"
        draggable
        onDragStart={handleDrag}
      >
        {newName}
        <Button
          className="edit-icon"
          onClick={(event) => toggleEditModal(event)}
          leftIcon={<Icon as={EditIcon} />}
        >
          Edit
        </Button>
      </Button>
      <Modal isOpen={isEditModalOpen} onClose={toggleEditModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Integration</ModalHeader>
          <ModalCloseButton onClick={toggleEditModal} />
          <ModalBody>
            <Input
              type="text"
              name="name"
              value={newName}
              onChange={handleInputChange}
              color={textColor}
              placeholder="Integration Name"
            />
            <Input
              type="text"
              name="prompt"
              value={prompt}
              color={textColor}
              onChange={handleInputChange}
              placeholder="Integration Prompt"
            />
            <Select
              name="integrationType"
              value={integrationType}
              onChange={handleIntegrationTypeChange}
            >
              <option value="none" style={{ color: textColor }}>None</option>
              <option value="GET" style={{ color: textColor }}>GET</option>
            </Select>
            {showHttpFields && (
              <>
                <Select
                  name="protocol"
                  value={protocol}
                  onChange={handleInputChange}
                  placeholder="Select Protocol"
                  color={textColor}
                >
                  <option value="http" style={{ color: textColor }}>
                    http
                  </option>
                  <option value="https" style={{ color: textColor }}>
                    https
                  </option>
                </Select>
                <Input
                  type="text"
                  name="host"
                  value={host}
                  color={textColor}
                  onChange={handleInputChange}
                  placeholder="Host"
                />
                <Input
                  type="number"
                  name="port"
                  value={port}
                  color={textColor}
                  onChange={handleInputChange}
                  placeholder="Port"
                />
                <Input
                  type="text"
                  name="username"
                  value={username}
                  color={textColor}
                  onChange={handleInputChange}
                  placeholder="Username"
                  autoComplete="off"
                />
                <Input
                  type="password"
                  name="password"
                  value={password}
                  color={textColor}
                  onChange={handleInputChange}
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </>
            )}
            <p>Select filters:</p>
            {filterOptions.map((filterOption) => (
              <div key={filterOption.value}>
                <Checkbox
                  name={`selectedFilters-${filterOption.value}`}
                  id={filterOption.label}
                  value={filterOption.value}
                  isChecked={selectedFilters.includes(filterOption.value)}
                  onChange={handleFilterChange}
                >
                  {filterOption.label}
                </Checkbox>
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button colorScheme="gray" ml={3} onClick={toggleEditModal}>Cancel</Button>
            <Button colorScheme="red" onClick={() => handleDeleteTransaction(key)}>Delete</Button>
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
