import React, { useEffect, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import styles from './styles';
import getYearsSince from '../../../utils/getYearsSince';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../../assets/styles/colorVariables';
import openWhatsapp from '../../../utils/openWhatsapp';
import callNumber from '../../../utils/callNumber';

export default function ChosenHelpersInfo({ user, showModal, setShowModal }) {
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        if (showModal) {
            bottomSheetRef.current?.present();
        }
    }, [showModal]);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={['70%']}
                onDismiss={() => setShowModal(false)}
                enablePanDownToClose
                style={{ borderRadius: 12 }}
            >
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.closeButton}>
                        <Icon name="close" color={colors.dark} />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: `data:image/png;base64,${user.photo}` }}
                        style={styles.imageContainer}
                    />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userSubtitle}>
                        {getYearsSince(user.birthday)} anos -{' '}
                        {user.address.city}
                    </Text>
                    <Text style={styles.phoneNumber}>Número: {user.phone}</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            color="#34A853"
                            style={styles.wppButton}
                            onPress={() => openWhatsapp(user.phone)}
                        >
                            <Icon
                                name="whatsapp"
                                type="font-awesome"
                                size={30}
                                color="#FAFAFA"
                            />
                            <Text style={styles.wppText}>
                                Inicie uma conversa
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            color="#FAFAFA"
                            style={styles.callButton}
                            onPress={() => callNumber(user.phone)}
                        >
                            <Icon name="phone" size={30} />
                            <Text style={styles.callText}>
                                Faça uma ligação
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
