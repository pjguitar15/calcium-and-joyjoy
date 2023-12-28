import React from 'react';
import { Flex, Button } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Flex>
            <Button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                First
            </Button>
            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </Button>
            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </Button>
            <Button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                Last
            </Button>
        </Flex>
    );
};

export default Pagination;
