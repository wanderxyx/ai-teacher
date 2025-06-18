import React from 'react';
import { AppShell, Title, NavLink, Group, ActionIcon, useMantineColorScheme, rem } from '@mantine/core';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { IconHome, IconApps, IconSun, IconMoon } from '@tabler/icons-react';

const RootLayout: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: rem(60) }}
      navbar={{ width: { base: rem(200) }, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header p="md">
        <Group justify="space-between" h="100%">
          <Title order={2} size="h3">AI Learning Assistant</Title>
          <ActionIcon 
            variant="light"
            size="lg"
            onClick={() => toggleColorScheme()}
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          to="/"
          label="Home"
          leftSection={<IconHome size={16} />}
          active={location.pathname === '/'}
        />
        <NavLink
          component={Link}
          to="/projects"
          label="Projects"
          leftSection={<IconApps size={16} />}
          active={location.pathname === '/projects'}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout; 