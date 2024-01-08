import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt="4">
            {pageNumbers.map(number => (
                <Button
                    key={number}
                    m="1"
                    p="2"
                    colorScheme={currentPage === number ? 'blue' : 'gray'}
                    onClick={() => paginate(number)}
                >
                    {number}
                </Button>
            ))}
        </Box>
    );
};

export default Pagination;
