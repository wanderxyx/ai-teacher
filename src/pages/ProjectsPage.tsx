import React from 'react';
import { Container, Title, Paper, Stack, Grid, Text, rem } from '@mantine/core';
import { useProjectStore } from '../stores/project';
import { ProjectCard } from '../components/common/ProjectCard';

const ProjectsPage: React.FC = () => {
  const { projects } = useProjectStore();

  return (
    <Container size="lg" py={rem(32)}>
      <Stack gap="xl">
        <Paper p="xl" radius="sm" withBorder>
          <Title order={1} size="h2" mb="lg">我的项目</Title>
          <Text size="lg" c="dimmed">管理和追踪您的学习项目</Text>
        </Paper>

        <Grid gutter="lg">
          {projects.map((project) => (
            <Grid.Col key={project.id} span={{ base: 12, sm: 6, md: 4 }}>
              <ProjectCard
                project={project}
                onSelect={(p) => {
                  const [owner, repo] = p.fullName.split('/');
                  useProjectStore.getState().getProjectDetails(owner, repo);
                }}
              />
            </Grid.Col>
          ))}
          {projects.length === 0 && (
            <Grid.Col>
              <Paper p="xl" radius="sm" withBorder>
                <Text ta="center" c="dimmed" size="lg">
                  暂无项目，请在首页搜索并添加项目
                </Text>
              </Paper>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </Container>
  );
};

export default ProjectsPage; 