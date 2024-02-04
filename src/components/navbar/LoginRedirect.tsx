'use client';
// Chakra Imports
import {
    Box,
    Button,
    Flex,
    Link,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import NavLink from '../link/NavLink';
export default function LoginRedirect(props: {
    secondary: boolean;
}) {
    const { secondary } = props;
    // Chakra Color Mode
    let menuBg = useColorModeValue('white', 'navy.800');
    const textColor = useColorModeValue('navy.700', 'white');
    const shadow = useColorModeValue(
        '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
        '0px 41px 75px #081132',
    );

    return (
        <>
            <Flex
                zIndex="100"
                w={{ sm: '100%', md: 'auto' }}
                alignItems="center"
                flexDirection="row"
                bg={menuBg}
                flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
                p="10px"
                borderRadius="30px"
                boxShadow={shadow}
            >
                <Box
                    color="white"
                    borderRadius="8px"
                    px="14px"
                    py="8px"
                >
                    <Text fontWeight="500" fontSize="sm" color={textColor}>
                        Please login to access the full functionality.
                    </Text>
                </Box>
                <NavLink href="/others/sign-in">
                    <Button
                        as="a"
                        variant="primary"
                        borderRadius="20px"
                        px="14px"
                        fontSize="sm"
                        fontWeight="500"
                        color="white"
                    >
                        Login
                    </Button>
                </NavLink>
            </Flex>
        </>
    );
}
