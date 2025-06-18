import React from 'react';
import { Container, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Title>Project Details</Title>
      {/* TODO: Add project detail component */}
      <div>Project ID: {id}</div>
    </Container>
  );
};

export default DetailPage; 