import React, { useContext, useState } from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { CategoryContext } from '../../../../store/contexts/categoryContext';
import { Icon } from 'react-native-elements';
import colors from '../../../../../assets/styles/colorVariables';

import Button from '../../../UI/button';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

export default function CategorySelector({ modalVisible, setModalVisible }) {
    const { categories } = useContext(CategoryContext);
    const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

    const includeCategoryIntoSelectedCategories = (categoryId) =>
        setSelectedCategoriesId([...selectedCategoriesId, categoryId]);

    const removeCategoryFromSelectedCategories = (categoryId) => {
        const removeCategoryId = selectedCategoriesId.filter(
            (categoryIdFromState) => categoryIdFromState !== categoryId,
        );
        setSelectedCategoriesId(removeCategoryId);
    };

    const selectCategory = (categoryId) => {
        if (selectedCategoriesId.includes(categoryId)) {
            removeCategoryFromSelectedCategories(categoryId);
        } else if (selectedCategoriesId.length < 3) {
            includeCategoryIntoSelectedCategories(categoryId);
        }
    };

    const getCategoryStyle = (categoryId) => {
        if (selectedCategoriesId.includes(categoryId)) {
            return styles.selectedCategory;
        } else if (selectedCategoriesId.length >= 3) {
            return styles.unvailableToSelectCategory;
        } else {
            return styles.notSelectedCategory;
        }
    };

    const getCategoryActiveOpacity = (categoryId) => {
        if (
            selectedCategoriesId.includes(categoryId) ||
            selectedCategoriesId.length < 3
        ) {
            return 0;
        } else {
            return 1;
        }
    };

    const renderCloseButton = () => (
        <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Icon
                name="times-circle"
                type="font-awesome"
                color={colors.danger}
                size={30}
            />
        </TouchableOpacity>
    );

    const renderModalTitle = () => (
        <>
            <Text style={styles.title}>Escolha as categorias</Text>
            <Text style={styles.subTitle}>(No máximo 3)</Text>
        </>
    );

    const renderCategoryList = () => (
        <ScrollView showsVerticalScrollIndicator={false}>
            {categories?.map((category) => (
                <TouchableOpacity
                    activeOpacity={getCategoryActiveOpacity(category._id)}
                    key={category._id}
                    onPress={() => {
                        selectCategory(category._id);
                    }}>
                    <Text style={getCategoryStyle(category._id)}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    return (
        <Modal
            visible={modalVisible}
            transparent
            onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity style={styles.container} activeOpacity={1}>
                <TouchableWithoutFeedback>
                    <View style={styles.content}>
                        {renderCloseButton()}
                        {renderModalTitle()}
                        {renderCategoryList()}
                        <Button title="concluir" large type="warning" />
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}
