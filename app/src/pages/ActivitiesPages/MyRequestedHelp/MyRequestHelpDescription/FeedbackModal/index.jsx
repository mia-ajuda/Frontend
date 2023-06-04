import React from 'react';
import { BaseModal } from '../../../../../components/modals/BaseModal';
import { Text, View } from 'react-native';
import { Input } from '../../../../../components/atoms/Input';
import { DefaultButton } from '../../../../../components/atoms/DefaultButton';

export const FeedbackModal = ({
    setShowFeedbackModal,
    showFeedbackModal,
    onCloseModal,
    feedback,
    setFeedback,
    onSubmit,
}) => {
    return (
        <BaseModal
            setIsVisible={setShowFeedbackModal}
            isVisible={showFeedbackModal}
            onCloseModal={onCloseModal}
            background="bg-new_background"
        >
            <Text className="text-lg font-ms-bold text-center text-black -mt-6 mb-6">
                Feedback para Ajudante
            </Text>
            <Input
                label={'Mensagem'}
                placeholder={
                    'Escreva sua mensagem que será enviada para o usuário ajudante'
                }
                value={feedback}
                setValue={setFeedback}
                lines={5}
                maxLength={150}
            />
            <View className="mt-4">
                <DefaultButton title="Enviar" onPress={onSubmit} />
            </View>
        </BaseModal>
    );
};
