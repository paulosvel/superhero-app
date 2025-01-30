import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { api } from '@/services/api';
import { CreateSuperheroDTO } from '@/types';

interface HeroFormProps {
  onSuccess: () => void;
}

export default function HeroForm({ onSuccess }: HeroFormProps) {
  const [formData, setFormData] = useState<CreateSuperheroDTO>({
    name: '',
    superpower: '',
    humilityScore: 0,
  });
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createSuperhero(formData);
      setFormData({ name: '', superpower: '', humilityScore: 0 });
      onSuccess();
      toast({
        title: 'Success',
        description: 'Hero added successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (err: unknown) {
      const error = err as Error;
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Card width="full" maxW="md">
      <CardHeader>
        <Heading size="md">Register New Hero</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Hero Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Superpower</FormLabel>
              <Input
                value={formData.superpower}
                onChange={(e) =>
                  setFormData({ ...formData, superpower: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Humility Score (01-10)</FormLabel>
              <Input
                type="number"
                min={1}
                max={10}
                value={formData.humilityScore}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    humilityScore: Number(e.target.value),
                  })
                }
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Add Hero
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
}