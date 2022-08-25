import React from 'react';
import helpOfferedRecomendations from '../../../../docs/FAQ/HelpOfferedRecomendations';
import { ModalComponent } from '../../modal';

export default function HelpOfferedModal({ visible, setVisible }) {
    return (
        <ModalComponent
            visible={visible}
            setVisible={setVisible}
            list={helpOfferedRecomendations}
        />
    );
}
