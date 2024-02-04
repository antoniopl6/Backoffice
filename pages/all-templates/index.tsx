'use client';

// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';

import TemplateCard from '@/components/card/TemplateCard';

export default function Settings() {
  return (
    <Box mt={{ base: '70px', md: '0px', xl: '0px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="20px">
        <TemplateCard
          link="/categories"
          illustration="📝"
          name="Categories"
          description="Create and personalize your company current categories, to handle different requests."
        />
        {/* <TemplateCard
          link="/all-transactions"
          illustration="🏹"
          name="Transactions"
          description="Add custom transactions to customize the flow of your chat."
        />
        <TemplateCard
          link="/admin/overview"
          illustration="🔐"
          name="Admin Pages"
          description="Go to your personal Admin page."
        /> */}
        {/* <TemplateCard
          externalLink="https://www.komsai.com/"
          illustration="📩"
          name="Reporting"
          description="Report any issue you could have using this portal here."
        /> */}
      </SimpleGrid>
    </Box>
  );
}
