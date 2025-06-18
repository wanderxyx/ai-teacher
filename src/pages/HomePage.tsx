import React from 'react';
import {
  Container,
  Title,
  TextInput,
  Grid,
  Text,
  Center,
  Loader
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ProjectCard } from '../components/common/ProjectCard';
import { useProjectStore } from '../stores/project';

const HomePage: React.FC = () => {
  const { projects, loading, error, searchProjects } = useProjectStore();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length >= 3) {
      searchProjects(query);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="lg" ta="center">
        AI 学习助手
      </Title>

      <TextInput
        placeholder="搜索 AI 相关项目..."
        leftSection={<IconSearch size={16} />}
        size="lg"
        radius="md"
        onChange={handleSearch}
        mb="xl"
      />

      {loading && (
        <Center>
          <Loader size="lg" />
        </Center>
      )}

      {error && (
        <Text color="red" ta="center" mb="md">
          {error}
        </Text>
      )}

      <Grid>
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
      </Grid>

      {!loading && !error && projects.length === 0 && (
        <Text ta="center" color="dimmed" size="lg">
          输入关键词开始搜索...
        </Text>
      )}
    </Container>
  );
};

export default HomePage; 