import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { CategoryContext } from '../../../../store/contexts/categoryContext';
import { UserContext } from '../../../../store/contexts/userContext';
import { Icon } from 'react-native-elements';
import colors from '../../../../../assets/styles/colorVariables';

import Button from '../../../UI/button';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

export default function CategorySelector({
    modalVisible,
    hideModal,
    setHelpSelectedCategoryIds,
    selectedCategoryIds,
    helpCreationType,
}) {
    const [categoriesByUser, setCategoriesByUser] = useState([]);
    const { categories } = useContext(CategoryContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        filterCategoriesByUser();
    }, []);

    const includeCategoryIntoSelectedCategories = (categoryId) =>
        setHelpSelectedCategoryIds([...selectedCategoryIds, categoryId]);

    const removeCategoryFromSelectedCategories = (categoryId) => {
        const removeCategoryId = selectedCategoryIds.filter(
            (categoryIdFromState) => categoryIdFromState !== categoryId,
        );
        setHelpSelectedCategoryIds(removeCategoryId);
    };

    const selectCategory = (categoryId) => {
        if (selectedCategoryIds.includes(categoryId)) {
            removeCategoryFromSelectedCategories(categoryId);
        } else if (selectedCategoryIds.length < 3) {
            includeCategoryIntoSelectedCategories(categoryId);
        }
    };

    const getCategoryStyle = (categoryId) => {
        if (selectedCategoryIds.includes(categoryId)) {
            return styles.selectedCategory;
        } else if (selectedCategoryIds.length >= 3) {
            return styles.unvailableToSelectCategory;
        } else {
            return styles.notSelectedCategory;
        }
    };

    const getCategoryActiveOpacity = (categoryId) => {
        if (
            selectedCategoryIds.includes(categoryId) ||
            selectedCategoryIds.length < 3
        ) {
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

    const removePsychologicalSupportFromCategories = () => {
        return categories.filter(
            (category) => category.name !== 'Apoio Psicológico',
        );
    };
    const filterCategoriesByUser = () => {
        let categoriesToList;
        if (helpCreationType == 'offer' && !user.ismentalHealthProfessional) {
            categoriesToList = removePsychologicalSupportFromCategories();
        } else {
            categoriesToList = categories;
        }
        setCategoriesByUser(categoriesToList);
    };

    const renderCategoryList = () => (
        <ScrollView showsVerticalScrollIndicator={false}>
            {categoriesByUser?.map((category) => {
                return (
                    <TouchableOpacity
                        activeOpacity={getCategoryActiveOpacity(category._id)}
                        key={category._id}
                        onPress={() => {
                            selectCategory(category._id);
                        }}
                    >
                        <Text style={getCategoryStyle(category._id)}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );

    return (
        <Modal
            visible={modalVisible}
            transparent
            onRequestClose={hideModal}
            animationType="fade"
        >
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={hideModal}
            >
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
