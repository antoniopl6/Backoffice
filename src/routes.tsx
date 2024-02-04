import { Icon } from './lib/chakra';
import {
  MdFileCopy,
  MdHome,
  MdLock,
  MdLayers,
  MdAutoAwesome,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import { CgComponents } from "react-icons/cg";
import { IoMdPerson } from 'react-icons/io';
import { LuHistory } from 'react-icons/lu';
import { RoundedChart } from '@/components/icons/Icons';

// Auth Imports
import { IRoute } from './types/navigation';
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";

const routes: IRoute[] = [
  {
    name: 'Main Page',
    path: '/all-templates',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: false,
    //rightElement: true,
  },
  {
    name: 'Categories',
    path: '/categories',
    icon: <Icon as={CgComponents} width="20px" height="20px" color="inherit" />,
    collapse: false,
    subcategories: [
    ],
  },
  // {
  //   name: 'Transactions',
  //   path: '/all-transactions',
  //   icon: <Icon as={FaArrowsTurnToDots} width="20px" height="20px" color="inherit" />,
  //   collapse: false,
  // },
  // {
  //   name: 'Transactions2 (upgrade in prg)',
  //   path: '/all-transactions2',
  //   icon: <Icon as={FaArrowsTurnToDots} width="20px" height="20px" color="inherit" />,
  //   collapse: false,
  // },
  // {
  //   name: 'Generic answers',
  //   path: '/generic-answers',
  //   icon: <Icon as={FaQuestion} width="20px" height="20px" color="inherit" />,
  //   collapse: false
  // },
  // // --- Admin Pages ---
  // {
  //   name: 'Admin Pages',
  //   path: '/admin',
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   collapse: true,
  //   items: [
  //     {
  //       name: 'Users Overview',
  //       layout: '/admin',
  //       path: '/overview',
  //     },
  //   ],
  // }
];

export { routes };
