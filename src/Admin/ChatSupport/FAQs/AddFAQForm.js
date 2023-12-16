import React, { useState } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { Box, Input, Button, Textarea } from '@chakra-ui/react';

const AddFAQForm = ({ onFAQAdded }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');

  const addFAQ = async () => {
    try {
      const response = await axiosInstance.post('/admin/faqs/create', { question_text: questionText });
      const faqId = response.data.id;
      if (answerText) {
        await axiosInstance.post('/admin/faq_answers/create', { faq_id: faqId, answer_text: answerText });
      }
      setQuestionText('');
      setAnswerText('');
      onFAQAdded();
    } catch (error) {
      console.error('Error adding FAQ and answer:', error);
    }
  };

  return (
    <Box mb={4}>
      <Input 
        placeholder="Enter FAQ question" 
        value={questionText} 
        onChange={(e) => setQuestionText(e.target.value)} 
        mb={2}
      />
      <Textarea
        placeholder="Enter answer (optional)"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        mb={2}
      />
      <Button onClick={addFAQ}>Add FAQ and Answer</Button>
    </Box>
  );
};

export default AddFAQForm;
