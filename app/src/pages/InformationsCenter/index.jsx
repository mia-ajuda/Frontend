import React, { useState } from 'react';
import { View } from 'react-native';
import faqOption from '../../docs/FAQ/faqOptions';
import { TutorialCard } from '../../components/molecules/TutorialCard';
import { SliderModal } from '../../components/organisms/SliderModal';
import EmergencyNumbers from '../../components/FAQModals/EmergencyNumbersModal';

export default function InformationsCenter() {
    const [pages, setPages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [emergencyNumbersVisible, setEmergencyNumbersVisible] =
        useState(false);

    const handleShowModal = (id) => {
        const selectedPages = faqOption[id].pages;
        setPages(selectedPages);
        setModalVisible(true);
    };

    return (
        <View className="flex-1 w-screen bg-new_background p-4">
            <SliderModal
                visible={modalVisible}
                pages={pages}
                closeModal={() => setModalVisible(false)}
            />
            <EmergencyNumbers
                setVisible={setEmergencyNumbersVisible}
                visible={emergencyNumbersVisible}
            />
            {faqOption.map((faq, i) => (
                <TutorialCard
                    key={faq.title}
                    description={faq.description}
                    title={faq.title}
                    margin={'mb-2'}
                    leftAligment={faq.id % 2}
                    onPress={() => {
                        faq.emergencyModal
                            ? setEmergencyNumbersVisible(true)
                            : handleShowModal(i);
                    }}
                />
            ))}
        </View>
    );
}
