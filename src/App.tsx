import { MantineProvider } from '@mantine/core';
import { HomePage } from './pages/HomePage';
import { useSettingsStore } from './stores/settings';
import '@mantine/core/styles.css';

function App() {
  const { darkMode } = useSettingsStore();

  return (
    <MantineProvider
      defaultColorScheme={darkMode ? 'dark' : 'light'}
    >
      <HomePage />
    </MantineProvider>
  );
}

export default App;
