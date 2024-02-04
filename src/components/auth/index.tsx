'use client';
// Chakra imports
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Footer from '@/components/footer/FooterAdmin';
import FixedPlugin from '@/components/fixedPlugin/FixedPlugin';
import { FaChevronLeft } from 'react-icons/fa';
import NavLink from '@/components/link/NavLink';
import { PropsWithChildren } from 'react';

interface DefaultAuthLayoutProps extends PropsWithChildren {
  children: JSX.Element;
  illustrationBackground: string;
}

export default function DefaultAuthLayout(props: DefaultAuthLayoutProps) {
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Flex
      position="absolute"
      w="100%"
      minHeight="100vh"
    >
      <Box
        h="100%"
        minH="100vh"
        w="100%"
        position="absolute"
        right="0"
        zIndex="0"
      >
        <Flex
          bg={illustrationBackground}
          justify="center"
          align="end"
          w="100%"
          h="100%"
          bgSize="cover"
          bgPosition="50%"
          position="absolute"
        />
      </Box>
      <Flex
        h="100%"
        w="100%"
        maxW={{ md: '66%', lg: '1313px' }}
        mx="auto"
        pt={{ md: '0px' }}
        px={{ lg: '30px', xl: '0px' }}
        ps={{ xl: '70px' }}
        pe={{ xl: '70px' }}
        justifyContent="start"
        direction="column"
        position="relative"
      >
        <NavLink
          href="/all-templates"
          styles={{
            width: 'fit-content',
            marginTop: '30px',
            paddingBottom: '30px'
          }}
        >
          <Flex
            align="center"
            ps={{ base: '25px', lg: '0px' }}
            pt={{ lg: '0px', xl: '0px' }}
            w="fit-content"

          >
            <Icon
              as={FaChevronLeft}
              me="12px"
              h="13px"
              w="8px"
              color="gray.500"
            />
            <Text ms="0px" fontSize="sm" color="gray.500">
              Back to the dashboard
            </Text>
          </Flex>
        </NavLink>
        {children}

        <Footer />
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}
