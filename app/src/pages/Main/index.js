import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import mapStyle from '../../../assets/styles/mapstyle';
import colors from '../../../assets/styles/colorVariables';
import CreateHelpButtons from '../../components/CreateHelpButtons';
import CategoryListModal from '../../components/modals/category/CategoryList';
import { HelpContext } from '../../store/contexts/helpContext';
import { UserContext } from '../../store/contexts/userContext';
import HelpList from '../../components/HelpList';
import UserMarker from './UserMarker';
import HelpMarker from './HelpMarker';

export default function Main({ navigation }) {
    const [region, setRegion] = useState(null);
    const [helpListVisible, setHelpListVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const { helpList } = useContext(HelpContext);
    const { userPosition } = useContext(UserContext);

    useEffect(() => {
        setRegion(null);
    }, [region]);

    const renderHelpMakers = () => {
        return helpList.map((help) => {
            const isRiskGroup = !!help.user.riskGroup.length;

            return (
                <HelpMarker
                    key={help._id}
                    isRiskGroup={isRiskGroup}
                    help={help}
                />
            );
        });
    };

    const renderFilterButton = () => (
        <TouchableOpacity
            style={styles.filter}
            onPress={() => {
                setFilterModalVisible(!filterModalVisible);
            }}>
            <Icon
                name="filter"
                type="font-awesome"
                color={colors.dark}
                size={20}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CategoryListModal
                visible={filterModalVisible}
                setVisible={setFilterModalVisible}
                isHistoryPage={false}
            />
            <TouchableOpacity
                style={styles.recenter}
                onPress={() => {
                    setRegion(userPosition);
                }}>
                <Icon
                    name="target-two"
                    type="foundation"
                    color={colors.light}
                    size={35}
                />
            </TouchableOpacity>

            <MapView
                initialRegion={userPosition}
                style={styles.map}
                region={region}
                onRegionChange={() => setHelpListVisible(false)}
                onPress={() => {
                    setHelpListVisible(false);
                }}
                customMapStyle={mapStyle.day.map}>
                <UserMarker userPosition={userPosition} />

                {renderHelpMakers()}
            </MapView>

            {renderFilterButton()}
            <CreateHelpButtons />
            <View style={styles.helpList}>
                <HelpList
                    helps={helpList}
                    visible={helpListVisible}
                    setVisible={setHelpListVisible}
                    navigation={navigation}
                />
            </View>
        </SafeAreaView>
    );
}
