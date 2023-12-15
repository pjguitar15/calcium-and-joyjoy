import React, { useState } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const ChatbotPage = () => {
    // Dummy data for chatbot
    const chatbotData = [
        { id: 1, message: 'Hello, how can I assist you?' },
        { id: 2, message: 'Sure, I can help with that.' },
        { id: 3, message: 'Sorry, I dont have the information youre looking for.' },
    ];

    const [response, setResponse] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleButtonClick = () => {
        setButtonClicked(true);
        setResponse('Thank you for clicking the button!');
    };

    return (
        <Box>
            <Heading as="h1" size="xl" mb={4}>
                Welcome to the Chatbot Page
            </Heading>
            <Text fontSize="lg" mb={2}>
                This is a dummy chatbot page.
            </Text>
            {/* Add your chatbot UI components here */}
            {chatbotData.map((item) => (
                <Box key={item.id} bg="gray.200" p={4} mb={2} borderRadius="md">
                    <Text>{item.message}</Text>
                </Box>
            ))}
            <Button colorScheme="blue" onClick={handleButtonClick}>
                Click Me!
            </Button>
            {buttonClicked && (
                <Box bg="green.200" p={4} mt={4} borderRadius="md">
                    <Text>{response}</Text>
                </Box>
            )}
        </Box>
    );
};

export default ChatbotPage;
