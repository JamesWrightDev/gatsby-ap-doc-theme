import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import * as React from 'react';
import theme from '../theme';
import SidePanel from './SidePanel';

const Layout: React.FC<{}> = ({ children }) => (
  <ChakraProvider theme={theme}>

    <Flex>
      <SidePanel />
      <Box ml="280px">
        {children}
      </Box>
    </Flex>
  </ChakraProvider>
);

export default Layout;
