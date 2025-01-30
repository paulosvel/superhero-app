import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Badge,
    Flex,
    Icon,
    Tooltip,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { FaStar, FaBolt, FaHeart } from 'react-icons/fa';
  import { Superhero } from '@/types';
  
  interface HeroCardProps {
    hero: Superhero;
  }
  
  export default function HeroCard({ hero }: HeroCardProps) {
    const bgGradient = useColorModeValue(
      'linear(to-r, blue.100, purple.100)',
      'linear(to-r, blue.900, purple.900)'
    );
  
    const getScoreColor = (score: number) => {
      if (score >= 8) return 'green';
      if (score >= 5) return 'yellow';
      return 'red';
    };
  
    return (
      <Card bgGradient={bgGradient}>
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading size="md" fontWeight="bold">
              {hero.name}
            </Heading>
            <Tooltip label={`Humility Score: ${hero.humilityScore}/10`}>
              <Badge
                colorScheme={getScoreColor(hero.humilityScore)}
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {hero.humilityScore}
              </Badge>
            </Tooltip>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize="lg">{hero.superpower}</Text>
        </CardBody>
        <CardFooter>
          <Flex gap={4}>
            <Tooltip label="Power Level">
              <Flex align="center" gap={1}>
                <Icon as={FaBolt} color="yellow.500" />
                <Text>{Math.floor(Math.random() * 100)}</Text>
              </Flex>
            </Tooltip>
            <Tooltip label="Experience">
              <Flex align="center" gap={1}>
                <Icon as={FaStar} color="orange.500" />
                <Text>{Math.floor(Math.random() * 1000)}</Text>
              </Flex>
            </Tooltip>
            <Tooltip label="Popularity">
              <Flex align="center" gap={1}>
                <Icon as={FaHeart} color="red.500" />
                <Text>{Math.floor(Math.random() * 500)}</Text>
              </Flex>
            </Tooltip>
          </Flex>
        </CardFooter>
      </Card>
    );
  }