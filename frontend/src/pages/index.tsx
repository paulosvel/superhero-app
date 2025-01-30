import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  useToast,
  Text,
  Flex,
  IconButton,
  useColorMode,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { api } from '@/services/api';
import { Superhero } from '@/types';
import HeroForm from '../../components/HeroForm';
import HeroCard from '../../components/HeroCard';

const MotionBox = motion(Box);

export default function Home() {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const fetchHeroes = async () => {
    try {
      const data = await api.getSuperheroes();
      setHeroes(data);
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

  useEffect(() => {
    fetchHeroes();
  }, []);

  const filteredHeroes = heroes.filter(
    (hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.superpower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Flex w="full" justify="space-between" align="center">
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              style={{lineHeight:'1.2'}}
            >
              Superhero Registry
            </Heading>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              size="lg"
              variant="ghost"
            />
          </Flex>

          <HeroForm onSuccess={fetchHeroes} />

          <InputGroup maxW="md">
            <InputLeftElement>
              <FaSearch />
            </InputLeftElement>
            <Input
              placeholder="Search heroes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="full">
            {filteredHeroes.map((hero, index) => (
              <MotionBox
                key={hero.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <HeroCard hero={hero} />
              </MotionBox>
            ))}
          </SimpleGrid>

          {filteredHeroes.length === 0 && (
            <Text fontSize="lg" color="gray.500">
              No heroes found. Try a different search term.
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}