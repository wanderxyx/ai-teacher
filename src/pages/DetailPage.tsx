import React from 'react';
import { Container, Title, Paper, Stack, Group, Text, Loader, rem } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '../stores/project';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedProject, loading, error } = useProjectStore();

  if (loading) {
    return (
      <Container size="lg" py={rem(32)}>
        <Stack align="center" gap="xl">
          <Loader size="lg" />
          <Text size="lg">加载项目详情...</Text>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py={rem(32)}>
        <Paper p="xl" radius="sm" withBorder>
          <Text c="red" ta="center" size="lg">{error}</Text>
        </Paper>
      </Container>
    );
  }

  if (!selectedProject) {
    return (
      <Container size="lg" py={rem(32)}>
        <Paper p="xl" radius="sm" withBorder>
          <Text c="dimmed" ta="center" size="lg">未找到项目信息</Text>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" py={rem(32)}>
      <Stack gap="xl">
        <Paper p="xl" radius="sm" withBorder>
          <Stack gap="md">
            <Title order={1} size="h2">{selectedProject.name}</Title>
            <Group>
              <Text size="sm" c="dimmed">作者：{selectedProject.owner.name}</Text>
              <Text size="sm" c="dimmed">Stars：{selectedProject.stargazersCount}</Text>
              <Text size="sm" c="dimmed">Forks：{selectedProject.forks}</Text>
              <Text size="sm" c="dimmed">Issues：{selectedProject.issues}</Text>
            </Group>
            <Text>{selectedProject.description}</Text>
          </Stack>
        </Paper>

        {/* TODO: Add more project details sections */}
        <Paper p="xl" radius="sm" withBorder>
          <Title order={2} size="h3" mb="lg">项目资源</Title>
          <Stack gap="md">
            <Text>README:</Text>
            <Paper p="md" withBorder style={{ maxHeight: '400px', overflow: 'auto' }}>
              <Text component="pre" style={{ whiteSpace: 'pre-wrap' }}>
                {selectedProject.readme}
              </Text>
            </Paper>
          </Stack>
        </Paper>

        <Paper p="xl" radius="sm" withBorder>
          <Title order={2} size="h3" mb="lg">学习进度</Title>
          {/* Add learning progress component */}
        </Paper>
      </Stack>
    </Container>
  );
};

export default DetailPage; 