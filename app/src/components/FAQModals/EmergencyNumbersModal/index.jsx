import React from 'react';
import emergencyNumbers from '../../../docs/FAQ/EmergencyNumbers';
import { ModalComponent } from '../modal';

export default function EmergencyNumbers({ visible, setVisible }) {
    // TODO: replace it later with a new modal
    return (
        <ModalComponent
            visible={visible}
            setVisible={setVisible}
            list={emergencyNumbers}
        />
    );
}
