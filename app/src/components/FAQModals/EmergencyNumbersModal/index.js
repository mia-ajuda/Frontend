import React from 'react';
import emergencyNumbers from '../../../docs/FAQ/EmergencyNumbers';
import { ModalComponent } from '../modal';

export default function EmergencyNumbers({ visible, setVisible }) {
    return (
        <ModalComponent
            visible={visible}
            setVisible={setVisible}
            list={emergencyNumbers}
        />
    );
}
