import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import CustomDrawerItemList from '../../organisms/CustomDrawerList/';
import styles from './styles';
import { UserCard } from '../../UserCard';
import { Divider } from '../../atoms/Divider';

export function CustomDrawerContent(props) {
    const { user } = useContext(UserContext);
    return (
        <DrawerContentScrollView {...props} style={styles.drawer}>
            <View style={styles.drawerContainer}>
                <View style={styles.header}>
                    <Image
                        source={require('../../../../assets/images/logo.png')}
                    />
                    <Text style={styles.headerText}>Mia Ajuda</Text>
                </View>
                <CustomDrawerItemList {...props} />
                <View style={styles.footer}>
                    <Divider />
                    <UserCard {...user} />
                </View>
            </View>
        </DrawerContentScrollView>
    );
}
