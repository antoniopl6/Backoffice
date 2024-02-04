/*eslint-disable*/

import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('token');
      setLoggedIn(!!storedToken);

      if (isLoggedIn) {
        router.push('/all-templates');
      } else {
        router.push('/others/sign-in');
      }
    }
  }, [router, isLoggedIn]);

  return (
    <Flex
      w="100%"
      direction="column"
      position="relative"
      mt={{ base: '70px', md: '0px', xl: '0px' }}
    ></Flex>
  );
}
