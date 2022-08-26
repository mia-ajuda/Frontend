import React from 'react';
import helpOfferedRecommendations from '../../../../docs/FAQ/HelpOfferedRecommendations';
import { ModalComponent } from '../../modal';

export default function HelpOfferedModal({ visible, setVisible }) {
    return (
        <ModalComponent
            visible={visible}
            setVisible={setVisible}
            list={helpOfferedRecommendations}
        />
    );
}
