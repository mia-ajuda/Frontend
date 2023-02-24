import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { UserContext } from '../../store/contexts/userContext';
import CustomDrawerItemList from './CustomDrawerList';
import styles from './styles';
export function CustomDrawerContent(props) {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <DrawerContentScrollView {...props} style={styles.drawer}>
            <View style={styles.drawerContainer}>
                <View style={styles.header}>
                    <Image
                        source={require('../../../assets/images/logo.png')}
                    />
                    <Text style={styles.headerText}>Mia Ajuda</Text>
                </View>
                <CustomDrawerItemList {...props} />
                <Text> sdajiosdjios</Text>
            </View>
        </DrawerContentScrollView>
    );
}
