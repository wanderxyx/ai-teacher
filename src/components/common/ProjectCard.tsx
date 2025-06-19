import React from 'react';
import { Card, Text, Group, Badge, ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconStar, IconBookmark } from '@tabler/icons-react';
import type { Project } from '../../types';
import { useSettingsStore } from '../../stores/settings';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { favorites, addFavorite, removeFavorite } = useSettingsStore();
  const isFavorite = favorites.includes(project.id);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(project.id);
    } else {
      addFavorite(project.id);
    }
  };

  return (
    <Card
      shadow={isDark ? 'md' : 'sm'}
      padding="lg"
      radius="md"
      withBorder
      onClick={() => onSelect(project)}
      style={{
        cursor: 'pointer',
        backgroundColor: isDark ? '#23272e' : '#fff',
        borderColor: isDark ? '#2C2E33' : '#e9ecef',
        transition: 'background 0.2s, border 0.2s',
      }}
    >
      <Card.Section inheritPadding py="xs" style={{ borderBottom: `1px solid ${isDark ? '#2C2E33' : '#e9ecef'}` }}>
        <Group justify="flex-start" align="center" gap="sm" wrap="nowrap">
          <Tooltip label={isFavorite ? '取消收藏' : '添加收藏'}>
            <ActionIcon
              onClick={handleFavoriteClick}
              variant="subtle"
              color={isFavorite ? (isDark ? 'yellow' : 'blue') : 'gray'}
              size="lg"
              aria-label="收藏"
            >
              <IconBookmark size={22} />
            </ActionIcon>
          </Tooltip>
          <Text
            fw={700}
            size="lg"
            c={isDark ? 'white' : 'black'}
            style={{ lineHeight: 1.2, overflow: 'hidden' }}
            lineClamp={1}
            w="100%"
          >
            {project.name}
          </Text>
        </Group>
      </Card.Section>

      <Text size="md" c={isDark ? 'gray.4' : 'gray.6'} lineClamp={1} mt="xs" style={{ minHeight: 24, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
        {project.description || '\u00A0'}
      </Text>

      <Group justify="space-between" align="center" mt="lg" w="100%">
        <Group gap="xs" align="center">
          <IconStar size={16} color={isDark ? '#FFD43B' : '#228be6'} />
          <Text size="sm" color="dimmed">
            {project.stargazersCount}
          </Text>
        </Group>
        <Group gap="md" wrap="nowrap" style={{ maxWidth: 220 }}>
          {project.language && (
            <Badge
              color={isDark ? 'blue.4' : 'blue'}
              variant="light"
              size="lg"
              radius="xl"
              style={{
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: 'uppercase',
                maxWidth: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                backgroundColor: isDark ? '#24304a' : undefined,
                color: isDark ? '#90caf9' : undefined
              }}
              title={project.language}
            >
              {project.language}
            </Badge>
          )}
          <Badge
            color={isDark ? 'pink.4' : 'pink'}
            variant="light"
            size="lg"
            radius="xl"
            style={{
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              backgroundColor: isDark ? '#4a2430' : undefined,
              color: isDark ? '#f783ac' : undefined
            }}
            title={project.category}
          >
            {project.category}
          </Badge>
        </Group>
      </Group>
    </Card>
  );
}; 