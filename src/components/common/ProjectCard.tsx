import React from 'react';
import { Card, Text, Group, Badge, ActionIcon, Tooltip } from '@mantine/core';
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
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => onSelect(project)}
      style={{ cursor: 'pointer' }}
    >
      <Card.Section inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500} size="lg">
            {project.name}
          </Text>
          <Tooltip label={isFavorite ? '取消收藏' : '添加收藏'}>
            <ActionIcon
              onClick={handleFavoriteClick}
              variant="subtle"
              color={isFavorite ? 'blue' : 'gray'}
            >
              <IconBookmark size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card.Section>

      <Text size="sm" color="dimmed" lineClamp={2}>
        {project.description}
      </Text>

      <Group justify="space-between" mt="md">
        <Group gap="xs">
          <IconStar size={16} />
          <Text size="sm" color="dimmed">
            {project.stargazersCount}
          </Text>
        </Group>

        {project.language && (
          <Badge color="blue" variant="light">
            {project.language}
          </Badge>
        )}

        <Badge color="grape" variant="light">
          {project.category}
        </Badge>
      </Group>
    </Card>
  );
}; 