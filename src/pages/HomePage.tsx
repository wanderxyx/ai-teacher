import React from 'react';
import {
  Container,
  Title,
  TextInput,
  Grid,
  Text,
  Center,
  Loader,
  Paper,
  Stack,
  rem
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ProjectCard } from '../components/common/ProjectCard';
import { useProjectStore } from '../stores/project';
import { debounce } from 'lodash';

const HomePage: React.FC = () => {
  const { projects, loading, error, searchProjects } = useProjectStore();

  // 使用useCallback和debounce包装搜索方法
  const debouncedSearch = React.useCallback(
    debounce((query: string) => {
      searchProjects(query);
    }, 300),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length >= 3) {
      debouncedSearch(query);
    }
  };

  // 在组件卸载时取消debounce
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Container size="lg" py={rem(32)}>
      <Stack gap="xl">
        <Paper p="xl" radius="sm" withBorder>
          <Title order={1} mb="lg" ta="center" size="h1">
            AI 学习助手
          </Title>

          <TextInput
            placeholder="搜索 AI 相关项目..."
            leftSection={<IconSearch size={16} />}
            size="lg"
            radius="sm"
            onChange={handleSearch}
          />
        </Paper>

        {loading && (
          <Center>
            <Loader size="lg" />
          </Center>
        )}

        {error && (
          <Text c="red" ta="center" mb="md">
            {error}
          </Text>
        )}

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
        </Grid>

        {!loading && !error && projects.length === 0 && (
          <Paper p="xl" radius="sm" withBorder>
            <Text ta="center" c="dimmed" size="lg">
              输入关键词开始搜索...
            </Text>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage; 