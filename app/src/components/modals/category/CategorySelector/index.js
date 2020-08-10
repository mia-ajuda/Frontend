import React, { useContext } from 'react';
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

export default function CategorySelector({
    modalVisible,
    hideModal,
    setHelpCategoryIds,
    categoryIds,
}) {
    const { categories } = useContext(CategoryContext);

    const includeCategoryIntoSelectedCategories = (categoryId) =>
        setHelpCategoryIds([...categoryIds, categoryId]);

    const removeCategoryFromSelectedCategories = (categoryId) => {
        const removeCategoryId = categoryIds.filter(
            (categoryIdFromState) => categoryIdFromState !== categoryId,
        );
        setHelpCategoryIds(removeCategoryId);
    };

    const selectCategory = (categoryId) => {
        if (categoryIds.includes(categoryId)) {
            removeCategoryFromSelectedCategories(categoryId);
        } else if (categoryIds.length < 3) {
            includeCategoryIntoSelectedCategories(categoryId);
        }
    };

    const getCategoryStyle = (categoryId) => {
        if (categoryIds.includes(categoryId)) {
            return styles.selectedCategory;
        } else if (categoryIds.length >= 3) {
            return styles.unvailableToSelectCategory;
        } else {
            return styles.notSelectedCategory;
        }
    };

    const getCategoryActiveOpacity = (categoryId) => {
        if (categoryIds.includes(categoryId) || categoryIds.length < 3) {
            return 0;
        } else {
            return 1;
        }
    };

    const renderCloseButton = () => (
        <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
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
            onRequestClose={hideModal}
            animationType="fade">
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={hideModal}>
                <TouchableWithoutFeedback>
                    <View style={styles.content}>
                        {renderCloseButton()}
                        {renderModalTitle()}
                        {renderCategoryList()}
                        <Button
                            title="Concluir"
                            large
                            type="warning"
                            press={hideModal}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}
