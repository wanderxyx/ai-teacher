import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { router } from './routes';
import '@mantine/core/styles.css';
import { theme } from './styles/theme';
import { useColorScheme } from '@mantine/hooks';
import './styles/global.css';

const App: React.FC = () => {
  // 获取系统颜色方案
  const preferredColorScheme = useColorScheme();

  return (
    <MantineProvider 
      theme={theme} 
      defaultColorScheme={preferredColorScheme}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
