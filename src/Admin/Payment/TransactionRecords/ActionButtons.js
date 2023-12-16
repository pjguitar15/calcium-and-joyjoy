import React from 'react';
import { Button } from "@chakra-ui/react";

const ActionButtons = ({ id, paymentStatus, updatePaymentStatus }) => {
    if (paymentStatus === 'verified') {
        return <span>VERIFIED</span>;
    }

    return (
        <Button colorScheme='orange'
                onClick={() => updatePaymentStatus(id, 'verified')}>
            Verify
        </Button>
    );
};

export default ActionButtons;
