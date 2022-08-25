import React from 'react';
import helpRequestRecomendations from '../../../../docs/FAQ/HelpRequestRecomendations';
import { ModalComponent } from '../../modal';

export default function HelpRequestModal({ visible, setVisible }) {
    return (
        <ModalComponent
            visible={visible}
            setVisible={setVisible}
            list={helpRequestRecomendations}
        />
    );
}
