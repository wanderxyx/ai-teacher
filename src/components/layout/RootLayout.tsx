import React from 'react';
import { AppShell, Title } from '@mantine/core';
import { Outlet, Link } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: { base: 200 }, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header p="xs">
        <Title order={2}>AI Learning Assistant</Title>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginBottom: '1rem', display: 'block' }}>
          <Title order={4}>Home</Title>
        </Link>
        <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <Title order={4}>Projects</Title>
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout; 