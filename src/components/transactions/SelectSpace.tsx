import React, { useState, useEffect } from 'react'
import { ConversationSelectable } from "./Components/Conversation/ConversationSelectable"
import { IntegrationSelectable } from "./Components/Integration/IntegrationSelectable"
//import './App.css'
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
} from '@chakra-ui/react';
import { Position, valPlaced, line } from './PlaceSpace';
const apiEndpoint = 'https://dev-labs-api.komsai.com/backoffice/transactions';
const buttons = [
    {
        name: 'Conversation',
    },
    {
        name: 'Integration',
    }
]

export function SelectSpace(props: any) {
    //const { components, setComponents, componentsConfig, setComponentsConfig, lines, setLines } = useComponentContext();
    const { nameFile, setNameFile, sumPrompt, setSumPrompt, components, setComponents, componentsConfig, setComponentsConfig, lines, setLines } = props;
    function handleOnDrag(e: React.DragEvent, componentType: string) {
        e.dataTransfer.setData("componentType", componentType);
        e.dataTransfer.setData("componentId", "");
    }
    
    return (
        <>
            {buttons.map(button => (
                <div
                    key={button.name}
                    className="button-draggable"
                    draggable
                    onDragStart={(e) => handleOnDrag(e, button.name)}
                >
                    <Button className='box-button-component' variant="primary">
                        {button.name}
                    </Button>
                </div>
            ))}
        </>
    )
}