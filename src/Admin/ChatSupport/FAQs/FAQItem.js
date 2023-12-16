import React, { useState } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { useToast, Box, Text, IconButton, Input, VStack, Heading } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import FAQAnswers from './FAQAnswers';

const FAQItem = ({ faq, fetchFaqs }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(faq.question_text);
  const toast = useToast();

  const editFaq = async () => {
    try {
      await axiosInstance.post(`/admin/faqs/edit/${faq.id}`, { question_text: editedText });
      setIsEditing(false);
      fetchFaqs();
      toast({ title: "FAQ updated", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      console.error('Error editing FAQ:', error);
      toast({ title: "Failed to update FAQ", status: "error", duration: 3000, isClosable: true });
    }
  };

  const deleteFaq = async () => {
    try {
      await axiosInstance.delete(`/admin/faqs/destroy/${faq.id}`);
      fetchFaqs();
      toast({ title: "FAQ deleted", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({ title: "Failed to delete FAQ", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" shadow="sm">
      {isEditing ? (
        <Input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <Heading as="h4" size="md">{faq.question_text}</Heading>
      )}
      {isEditing ? (
        <>
          <IconButton aria-label="Save Edit" icon={<CheckIcon />} onClick={editFaq} ml={2} />
          <IconButton aria-label="Cancel Edit" icon={<CloseIcon />} onClick={() => setIsEditing(false)} ml={2} />
        </>
      ) : (
        <>
          <IconButton aria-label="Edit FAQ" icon={<EditIcon />} onClick={() => setIsEditing(true)} ml={2} />
          <IconButton aria-label="Delete FAQ" icon={<DeleteIcon />} onClick={deleteFaq} ml={2} />
        </>
      )}
      <FAQAnswers faqId={faq.id} faqHasAnswer={faq.answers.length > 0} />
    </Box>
  );
};

export default FAQItem;
