import React from 'react';
import helpRequestRecommendations from '../../../../docs/FAQ/HelpRequestRecommendations';
import { ModalComponent } from '../../modal';

export default function HelpRequestModal({ visible, setVisible }) {
    return (
        <ModalComponent
            visible={visible}
            setVisible={setVisible}
            list={helpRequestRecommendations}
        />
    );
}
