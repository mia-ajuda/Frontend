import React from 'react';
import { View } from 'react-native';
import FaqCard from '../../components/FaqCard';
import faqOption from '../../docs/FAQ/faqOptions';
import styles from './styles';

export default function InformationsCenter() {
    return (
        <View style={styles.container}>
            <View style={styles.cardsDirections}>
                {faqOption.map((faq) => {
                    return <FaqCard key={faq.id} faq={faq} />;
                })}
            </View>
        </View>
    );
}
