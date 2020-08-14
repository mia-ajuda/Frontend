import React, { useState, useContext } from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import Buttom from '../../../UI/button';
import SelectBox from '../../../UI/selectBox';
import styles from './styles';
import { Icon } from 'react-native-elements';
import CategoryDescriptionModal from '../categoryDescription';
import { CategoryContext } from '../../../../store/contexts/categoryContext';

export default function CategoryList({ visible, setVisible }) {
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(
        false,
    );
    const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);
    const {
        categories,
        setSelectedCategories,
        selectedCategories,
    } = useContext(CategoryContext);

    async function filterHelplist() {
        setSelectedCategories(selectedCategoryArray);
        setVisible(!visible);
    }

    async function clearFilterHelplist() {
        setSelectedCategories([]);
        setVisible(!visible);
    }

    const renderCategories = () => (
        <ScrollView style={styles.modalBody}>
            {categories.map((category) => (
                <SelectBox
                    key={category._id}
                    title={category.name}
                    filterCategoryArray={selectedCategories}
                    setSelectedCategoryArray={setSelectedCategoryArray}
                    selectedCategoryArray={selectedCategoryArray}
                    category={category}
                />
            ))}
        </ScrollView>
    );

    const renderFilterButtons = () => {
        if (selectedCategories.length) {
            return (
                <View style={styles.filterButtons}>
                    <Buttom
                        title="Limpar"
                        type="primary"
                        press={() => {
                            clearFilterHelplist();
                        }}
                    />
                    <Buttom
                        title="Filtrar"
                        type="warning"
                        press={() => {
                            filterHelplist();
                        }}
                    />
                </View>
            );
        }
        return (
            <Buttom
                title="Filtrar"
                type="warning"
                large
                press={() => {
                    filterHelplist();
                }}
            />
        );
    };

    const renderHelpFilterButtons = () => (
        <View style={styles.contentButtons}>
            <View>
                <TouchableOpacity>
                    <Text>Pedidos</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Ofertas</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Instituicoes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => setVisible(false)}>
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => {
                    setVisible(false);
                }}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        {renderHelpFilterButtons()}
                        <View style={styles.contentHeader}>
                            <Text style={styles.title}>CATEGORIAS</Text>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={() => {
                                    setDescriptionModalVisible(
                                        !descriptionModalVisible,
                                    );
                                }}>
                                <Icon
                                    name="question-circle"
                                    type="font-awesome"
                                    color="#C4C4C4"
                                    size={40}
                                />
                            </TouchableOpacity>
                        </View>

                        {renderCategories()}
                        {renderFilterButtons()}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
            <CategoryDescriptionModal
                visible={descriptionModalVisible}
                setVisible={setDescriptionModalVisible}
            />
        </Modal>
    );
}
