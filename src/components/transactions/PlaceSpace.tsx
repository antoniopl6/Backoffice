//import './App.css';
import { useState } from 'react';
import { ConversationSelectable } from './Components/Conversation/ConversationSelectable';
import { IntegrationSelectable } from './Components/Integration/IntegrationSelectable';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
//import './Line.css';
import Line from './Line.jsx'
import {
    Box,
    Flex,
    Drawer,
    DrawerBody,
    Icon,
    useColorModeValue,
    DrawerOverlay,
    useDisclosure,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
export interface Position {
    x: number;
    y: number;
}

export interface valPlaced {
    key: string;
    pos: Position;
    type: string;

}

export interface line {
    start: valPlaced;
    end: valPlaced;
}

export function PlaceSpace(props: any) {
    const { componentsConfig, setComponentsConfig, lines, setLines, components, setComponents } = props
    const { isOpen } = useDisclosure();
    //const [components, setComponents] = useState<valPlaced[]>(cookies.get('components') || []);
    //const [lines, setLines] = useState<line[]>(cookies.get('lines') || []);
    //const { components, setComponents, componentsConfig, setComponentsConfig, lines, setLines } = useComponentContext();
    function handleOnDrop(e: React.DragEvent) {
        e.preventDefault();
        let componentSelectable;
        let pos: Position;
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (1280 >= window.innerWidth) {
            pos = { x: e.clientX + scrollX, y: e.clientY + scrollY };
        } else {
            pos = { x: e.clientX - 284 + scrollX, y: e.clientY + scrollY };
        }
        const componentType = e.dataTransfer.getData('componentType') as string;
        const componentId = e.dataTransfer.getData('componentId') as string;
        const buttonWidth = e.dataTransfer.getData('buttonWidth') as unknown as number;
        const buttonHeight = e.dataTransfer.getData('buttonHeight') as unknown as number;
        const dropSpace = document.getElementById('space-hold-components');
        const dropSpaceRect = dropSpace?.getBoundingClientRect();
        if (dropSpaceRect) {
            if (e.clientX - buttonWidth / 2 < dropSpaceRect.left ?? 0) {
                pos.x += buttonWidth / 2 - (e.clientX - dropSpaceRect.left ?? 0);
            }
            if (e.clientY - buttonHeight / 2 < dropSpaceRect.top ?? 0) {
                pos.y += buttonHeight / 2 - (e.clientY - dropSpaceRect.top ?? 0);
            }
            if (e.clientX + buttonWidth / 2 > dropSpaceRect.right ?? 0) {
                pos.x -= e.clientX + buttonWidth / 2 - dropSpaceRect.right ?? 0;
            }
            if (e.clientY + buttonHeight / 2 > dropSpaceRect.bottom ?? 0) {
                pos.y -= e.clientY + buttonHeight / 2 - dropSpaceRect.bottom ?? 0;
            }
        }
        if (componentId === '') {
            const key = uuidv4();
            const val: valPlaced = {
                key: key,
                pos: pos,
                type: componentType // Store the component type
            };
            var config: any;
            if (componentType === 'Integration') {
                config = {
                    type: 'Integration',
                    newName: componentType,
                    key: key,
                    prompt: '',
                    integrationType: 'none',
                    protocol: 'http',
                    host: '',
                    port: '',
                    username: '',
                    password: '',
                    selectedFilters: [],
                };

            }
            else if (componentType === 'Conversation') {
                config = {
                    type: 'Conversation',
                    newName: componentType,
                    prompt: '',
                    key: key,
                };

            }
            setComponentsConfig([...componentsConfig, config]);
            //cookies.set('componentsConfig', [...componentsConfig, config], { path: '/' , maxAge: 31536000});
            setComponents([...components, val]);
            //cookies.set('components', [...components, val], { path: '/' , maxAge: 31536000});
        }
        else {
            const componentToUpdate = components.find((component: valPlaced) => component.key === componentId);

            if (componentToUpdate) {
                //Update position of the component
                const updatedComponent = { ...componentToUpdate, pos: pos };

                const updatedComponents = components.map((component: valPlaced) =>
                    component.key === componentId ? updatedComponent : component
                );

                setComponents(updatedComponents);
                //cookies.set('components', updatedComponents, { path: '/' , maxAge: 31536000});
                //Change lines if there is some match
                const updatedLines = lines.map((line: line) => {
                    if (line.start.key === componentId) {
                        return {
                            ...line, start: {
                                ...line.start, pos: {
                                    x: pos.x
                                    , y: pos.y
                                }
                            }
                        };
                    }
                    if (line.end.key === componentId) {
                        return {
                            ...line, end: {
                                ...line.end, pos: {
                                    x: pos.x
                                    , y: pos.y
                                }
                            }
                        };
                    }
                    return line;
                });
                setLines(updatedLines);
                //cookies.set('lines', updatedLines, { path: '/' , maxAge: 31536000});
            }
        }
    }
    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    const [startButton, setStartButton] = useState<valPlaced | null>(null);
    const checkForCycle = (current: string, target: string, visited: Set<string>): boolean => {
        if (current === target) {
            return true;
        }

        visited.add(current);

        const connectedLines = lines.filter((line: line) => line.start.key === current);
        for (const line of connectedLines) {
            if (!visited.has(line.end.key)) {
                if (checkForCycle(line.end.key, target, visited)) {
                    return true;
                }
            }
        }

        visited.delete(current);
        return false;
    };
    const handleButtonClick = (component: valPlaced) => {
        if (!startButton) {
            setStartButton(component);
        } else if (startButton.key !== component.key) {
            const hasCycle = checkForCycle(component.key, startButton.key, new Set());
            const notValid = lines.find((line: line) => line.start.key === startButton.key || line.end.key === component.key);

            if (hasCycle) {
                setStartButton(null);
                alert("Invalid connection: Adding this line would create a cycle.");
                return;
            }

            if (!notValid) {
                const newLine: line = {
                    start: {
                        ...startButton,
                        pos: {
                            x: startButton.pos.x,
                            y: startButton.pos.y
                        },
                    },
                    end: {
                        ...component,
                        pos: {
                            x: component.pos.x,
                            y: component.pos.y
                        },
                    },
                };
                setLines([...lines, newLine]);
                //cookies.set('lines', [...lines, newLine], { path: '/' , maxAge: 31536000});
                setStartButton(null);
            } else {
                setStartButton(null);
                alert("Invalid connection: Line can only follow a linear sequence.");
            }
        }
    };
    const deleteComponent = (idToDelete: string) => {
        //Delete component
        const updatedComponents = components.filter((component: valPlaced) => component.key !== idToDelete);
        setComponents(updatedComponents);
        //cookies.set('components', updatedComponents, { path: '/' , maxAge: 31536000});
        const updatedConfig = componentsConfig.filter((config: any) => config.key !== idToDelete);
        setComponentsConfig(updatedConfig);
        //cookies.set('componentsConfig', updatedConfig, { path: '/' , maxAge: 31536000});
        //Delete all lines
        const updatedLines = lines.filter(
            (line: line) => line.start.key !== idToDelete && line.end.key !== idToDelete
        );
        setLines(updatedLines);
        //cookies.set('lines', updatedLines, { path: '/' , maxAge: 31536000});
        setStartButton(null);
    };
    const deleteLine = (idx: number) => {
        const updatedLines = [...lines];
        updatedLines.splice(idx, 1);
        setLines(updatedLines);
        //cookies.set('lines', updatedLines, { path: '/' , maxAge: 31536000});
    };
    return (
        <section id="drop-space" className="drop-space" onDrop={handleOnDrop} onDragOver={handleDragOver}>
            {lines.length > 0 && lines.map((line: line, index: number) => (
                <Line key={index} start={line.start.pos} end={line.end.pos} idx={index} onDelete={deleteLine} />
            ))}

            {components.length > 0 && components.map((component: valPlaced, index: number) => {
                const config = componentsConfig.find((c: valPlaced) => c.key === component.key);
                if (!config) {
                    return null; // No matching config found
                }

                return (
                    <div
                        key={component.key}
                        className="dropped-component"
                        style={{
                            position: 'absolute',
                            left: `${component.pos?.x}px`,
                            top: `${component.pos?.y}px`,
                        }}
                        onClick={() => handleButtonClick(component)}
                    >
                        {component.type === 'Integration' ? (
                            <IntegrationSelectable
                                name={component.type}
                                id={component.key}
                                deleteComponent={deleteComponent}
                                value={config}
                                setStartButton={setStartButton}
                                componentsConfig={componentsConfig}
                                setComponentsConfig={setComponentsConfig}
                            />
                        ) : (
                            <ConversationSelectable
                                name={config.newName}
                                id={component.key}
                                deleteComponent={deleteComponent}
                                value={config}
                                setStartButton={setStartButton}
                                componentsConfig={componentsConfig}
                                setComponentsConfig={setComponentsConfig}
                            />
                        )}
                    </div>
                );
            })
            }
        </section>
    );
}
