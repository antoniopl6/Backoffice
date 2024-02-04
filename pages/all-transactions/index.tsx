'use client';
//declare module 'cyusercategories';
// Chakra imports
import Card from '@/components/card/Card';
import ProjectCard from '@/components/card/ProjectCard';
import { SearchBar } from '@/components/search';
import { Transactions } from '@/components/transactions/Transactions';
import {
  useColorModeValue,
} from '@chakra-ui/react';
import { MdApps, MdDashboard } from 'react-icons/md';

export default function Settings() {
  const textColor = useColorModeValue('navy.700', 'white');
  const buttonBg = useColorModeValue('transparent', 'navy.800');
  const hoverButton = useColorModeValue(
    { bg: 'gray.100' },
    { bg: 'whiteAlpha.100' },
  );
  const activeButton = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.200' },
  );
  //<UserCategories />
  return (
    <Transactions />
  );
}
