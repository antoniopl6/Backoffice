'use client';

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import illustration from '/public/img/auth/auth.png';
import { HSeparator } from '@/components/separator/Separator';
import DefaultAuth from '@/components/auth';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import NavLink from '@/components/link/NavLink';
import { useRouter } from 'next/router';

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.500';
  const textColorDetails = useColorModeValue('navy.700', 'gray.500');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const backColor = useColorModeValue('white', '#101434');
  const colorBg = useColorModeValue(
    'radial-gradient(58.11% 44.54% at 51.59% -9.61%, #FFFFFF 0%, #F5F5F5 22.92%, #EBEBEB 42.71%, #CCCCCC 88.54%)',
    'radial-gradient(58.11% 44.54% at 51.59% -9.61%, rgb(180, 176, 254) 0%, rgb(54, 50, 133) 22.92%, rgb(17, 13, 91) 42.71%, rgb(5, 3, 39) 88.54%)'
  );
  const placeholderColor = useColorModeValue(
    { color: 'gray.500', fontWeight: '500' },
    { color: 'whiteAlpha.600', fontWeight: '500' },
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const alias = process.env.NEXT_PUBLIC_ALIAS;
  const apiEndpoint = alias == "pro"
  ? `https://api.komsai.com/cross/login`
  : `https://${alias}-api.komsai.com/cross/login`;
  const apiKey = process.env.NEXT_PUBLIC_X_API_KEY_LABS;
  const [showPopup, setShowPopup] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          'Source': 'backoffice',
          'User': target['username'].value,
          'Password': target['pass'].value,
          'ClientId': target['clientId'].value
        })
      });
      const responseBody = await response.json();
      if (responseBody.statusCode == 200) {
        setShake(false);
        sessionStorage.setItem('token', responseBody.body.Token);
        sessionStorage.setItem('clientId', target['clientId'].value);
        router.push('/all-templates');
      } else {
        console.log("Login failed");
        setShowPopup(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 500);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setShowPopup(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <>
      <DefaultAuth illustrationBackground={colorBg}>
        <Flex
          as="form"
          onSubmit={handleLogin}
          w="100%"
          maxW={{ base: '100%', md: '420px' }}
          mx="auto"
          direction="column"
          textAlign="center"
          borderRadius="md"
          p="4"
          bg={backColor}
          zIndex={6}
          alignItems="center"
          marginBottom="20px"
          className={shake ? 'shake' : ''}
        >
          <Box me="auto" style={{ marginInlineEnd: 'unset', WebkitMarginEnd: 'unset' }}>
            <Text
              color={textColor}
              fontSize={{ base: '34px', lg: '36px' }}
              mb="10px"
              justifySelf="center"
              fontWeight={'700'}
            >
              Sign In
            </Text>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="500"
              fontSize="sm"
            >
              Enter your username, password and your company client id to sign in!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: '100%', md: '420px' }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: 'auto', lg: 'unset' }}
            me="auto"
            mb={{ base: '20px', md: 'auto' }}
          >

            <FormControl>
              <FormLabel
                cursor="pointer"
                display="flex"
                ms="4px"
                htmlFor="username"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Username<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                id="username"
                variant="auth"
                fontSize="sm"
                type="text"
                placeholder="Enter your username"
                mb="24px"
                size="lg"
                borderColor={borderColor}
                h="54px"
                fontWeight="500"
                _placeholder={{ placeholderColor }}
              />
              {/* PASSWORD */}
              <FormLabel
                cursor="pointer"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                htmlFor="pass"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  variant="auth"
                  id="pass"
                  fontSize="sm"
                  placeholder="Enter your password"
                  mb="24px"
                  size="lg"
                  borderColor={borderColor}
                  h="54px"
                  fontWeight="500"
                  _placeholder={{ placeholderColor }}
                  type={show ? 'text' : 'password'}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              {/* CLIENTID */}
              <FormLabel
                cursor="pointer"
                display="flex"
                htmlFor="clientId"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Client Id<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                id="clientId"
                variant="auth"
                fontSize="sm"
                type="text"
                placeholder="Enter your company client Id"
                mb="24px"
                size="lg"
                borderColor={borderColor}
                h="54px"
                fontWeight="500"
                _placeholder={{ placeholderColor }}
              />

              {/* <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    id="remember-login"
                    colorScheme="brandScheme"
                    me="10px"
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    color={textColor}
                    fontWeight="600"
                    fontSize="sm"
                  >
                    Keep me logged in
                  </FormLabel>
                </FormControl>
                <NavLink href="#">
                  <Text
                    color={textColorBrand}
                    w="124px"
                    fontWeight="600"
                    fontSize="sm"
                  >
                    Forgot password?
                  </Text>
                </NavLink>
              </Flex> */}



              {/* CONFIRM */}
              <Button
                variant="primary"
                py="20px"
                px="16px"
                fontSize="sm"
                borderRadius="45px"
                mt={{ base: '20px', md: '0px' }}
                w="100%"
                h="54px"
                mb="24px"
                type='submit'
              >
                Sign In
              </Button>
             
            </FormControl>
            {/* <Flex justifyContent="center" alignItems="start" maxW="100%" mt="0px">
              <Text color={textColorDetails} fontWeight="500" fontSize="sm">
                Not registered yet?
              </Text>
              <Link href="/others/register" py="0px" lineHeight={'120%'}>
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  as="span"
                  ms="5px"
                  fontWeight="600"
                >
                  Create an Account
                </Text>
              </Link>
            </Flex> */}
          </Flex>
        </Flex>
      </DefaultAuth>
      {showPopup && (
        <div className="alert-container error">
          <Alert status="error">
            <AlertIcon />
            Login failed. Please try again.
          </Alert>
        </div>
      )}
    </>
  );
}

export default SignUp;
