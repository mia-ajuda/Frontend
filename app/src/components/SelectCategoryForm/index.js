import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CategorySelectorModal from '../modals/category/CategorySelector';
import { CategoryContext } from '../../store/contexts/categoryContext';
import styles from './styles';

export default function SelectCategoryForm({
    helpCategoryIds,
    setHelpCategoryIds,
    helpType,
}) {
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const { categories } = useContext(CategoryContext);
    const openCategoryModal = () => setCategoryModalVisible(true);
    const hideCategoryModal = () => setCategoryModalVisible(false);

    const renderPickerCategoryForm = () => (
        <TouchableOpacity
            style={styles.addCategory}
            onPress={openCategoryModal}>
            <Text style={styles.addCategoryText}>Categorias +</Text>
        </TouchableOpacity>
    );

    const renderSelectedCategories = () => {
        return (
            <View style={styles.categoriesContainer}>
                {categories.map((category) => {
                    if (helpCategoryIds.includes(category._id)) {
                        return (
                            <Text
                                key={category.name}
                                style={styles.categoryName}>
                                {category.name}
                            </Text>
                        );
                    }
                })}
            </View>
        );
    };
    return (
        <View>
            <CategorySelectorModal
                modalVisible={categoryModalVisible}
                openModal={openCategoryModal}
                hideModal={hideCategoryModal}
                setHelpSelectedCategoryIds={setHelpCategoryIds}
                selectedCategoryIds={helpCategoryIds}
                helpCreationType={helpType}
            />
            {renderPickerCategoryForm()}
            {renderSelectedCategories()}
        </View>
    );
}
