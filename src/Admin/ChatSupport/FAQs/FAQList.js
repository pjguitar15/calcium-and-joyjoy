import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { Box, VStack, useToast, Heading } from '@chakra-ui/react';
import FAQItem from './FAQItem';
import AddFAQForm from './AddFAQForm';

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axiosInstance.get('/admin/faqs');
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load FAQs.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
        <Heading as="h3" size="lg" mb={4}>
            Chat Support | <span style={{ color: '#718096' }}>FAQs</span>
        </Heading>
        <AddFAQForm onFAQAdded={fetchFaqs} />
        <VStack spacing={5} align="stretch">
            {faqs.map(faq => (
                <FAQItem key={faq.id} faq={faq} fetchFaqs={fetchFaqs} />
            ))}
        </VStack>
    </Box>
);
};

export default FAQList;
