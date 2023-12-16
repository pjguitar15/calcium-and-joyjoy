import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Button, useToast, ScaleFade } from '@chakra-ui/react';
import axios from 'axios';

const FaqPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [selectedFaqId, setSelectedFaqId] = useState(null);
    const toast = useToast();

    useEffect(() => {
        axios.get('http://18.223.157.202/backend/api/admin/faqs')
            .then(res => {
                setFaqs(res.data);
            })
            .catch(err => {
                console.error(err);
                toast({
                    title: "Error loading FAQs",
                    description: "There was a problem loading the FAQ data.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, []);

    const handleFaqClick = (faqId) => {
        setSelectedFaqId(faqId === selectedFaqId ? null : faqId);
    };

    return (
        <Box p={5}>
            <Heading as="h1" size="md" mb={4}>
                Interactive FAQ Chatbot
            </Heading>
            <VStack spacing={4} align="flex-start">
                {faqs.map(faq => (
                    <Button 
                        key={faq.id} 
                        onClick={() => handleFaqClick(faq.id)} 
                        size="sm" 
                        variant="ghost"
                        colorScheme="blue"
                        borderRadius="full"
                        px={4}
                        py={2}
                        alignSelf="flex-start"
                        maxW="80%"
                    >
                        {faq.question_text}
                    </Button>
                ))}
            </VStack>
            <Box mt={5} p={5} border="1px" borderColor="gray.200" borderRadius="md" bg="gray.50">
                <VStack spacing={2} align="flex-start">
                    {faqs.filter(faq => faq.id === selectedFaqId).map(faq => (
                        <ScaleFade key={faq.id} in={true} initialScale={0.9}>
                            {faq.answers.map(answer => (
                                <Box key={answer.id} bg="orange.100" p={2} borderRadius="lg" alignSelf="flex-end" maxW="80%">
                                    <Text fontSize="sm">{answer.answer_text}</Text>
                                </Box>
                            ))}
                        </ScaleFade>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};

export default FaqPage;
