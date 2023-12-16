import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { Button, Box, Text, IconButton, Input, Stack, Textarea, useToast } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const FAQAnswers = ({ faqId }) => {
  const [answers, setAnswers] = useState([]);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchAnswers();
  }, [faqId]);

  const fetchAnswers = async () => {
    try {
      const response = await axiosInstance.get(`/admin/faq_answers?faq_id=${faqId}`);
      setAnswers(response.data);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  const addAnswer = async () => {
    try {
      await axiosInstance.post('/admin/faq_answers/create', { faq_id: faqId, answer_text: newAnswerText });
      setNewAnswerText('');
      fetchAnswers();
      toast({
        title: 'Answer added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding answer:', error);
      toast({
        title: 'Failed to add answer.',
        description: 'There was a problem adding the answer.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editAnswer = async (answerId) => {
    try {
      await axiosInstance.post(`/admin/faq_answers/edit/${answerId}`, { faq_id: faqId, answer_text: editingText });
      setEditingAnswerId(null);
      setEditingText('');
      fetchAnswers();
      toast({ title: "Answer edited", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      console.error('Error editing answer:', error);
      toast({ title: "Failed to edit answer", status: "error", duration: 3000, isClosable: true });
    }
  };
  

  const deleteAnswer = async (answerId) => {
    try {
      await axiosInstance.delete(`/admin/faq_answers/destroy/${answerId}`);
      fetchAnswers();
      toast({ title: "Answer deleted", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      console.error('Error deleting answer:', error);
      toast({ title: "Failed to delete answer", status: "error", duration: 3000, isClosable: true });
    }
  };
  

  return (
    <Box mt={4}>
      {answers.map(answer => (
        answer.faq_id === faqId && (
          <Stack key={answer.id} direction="row" alignItems="center" spacing={2}>
            {editingAnswerId === answer.id ? (
              <Input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <Text flex="1">{answer.answer_text}</Text>
            )}
            {editingAnswerId === answer.id ? (
              <>
                <IconButton aria-label="Save Edit" icon={<CheckIcon />} onClick={() => editAnswer(answer.id)} />
                <IconButton aria-label="Cancel Edit" icon={<CloseIcon />} onClick={() => setEditingAnswerId(null)} />
              </>
            ) : (
              <>
                <IconButton aria-label="Edit Answer" icon={<EditIcon />} onClick={() => { setEditingAnswerId(answer.id); setEditingText(answer.answer_text); }} />
                <IconButton aria-label="Delete Answer" icon={<DeleteIcon />} onClick={() => deleteAnswer(answer.id)} />
              </>
            )}
          </Stack>
        )
      ))}
      {answers.length === 0 && (
        <Box mt={2}>
          <Textarea
            placeholder="Add a detailed answer"
            value={newAnswerText}
            onChange={(e) => setNewAnswerText(e.target.value)}
            size="sm"
          />
          <Button leftIcon={<AddIcon />} onClick={addAnswer} mt={2}>Add Answer</Button>
        </Box>
      )}
    </Box>
  );
};

export default FAQAnswers;
