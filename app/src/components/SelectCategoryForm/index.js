import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CategorySelector from '../modals/category/CategorySelector';
import { CategoryContext } from '../../store/contexts/categoryContext';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function SelectCategoryForm({
    helpCategoryIds,
    setHelpCategoryIds,
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
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 10,
                }}>
                {categories.map((category) => {
                    if (helpCategoryIds.includes(category._id)) {
                        return (
                            <Text
                                style={{
                                    backgroundColor: colors.secondary,
                                    padding: 5,
                                    elevation: 2,
                                    margin: 5,
                                    borderRadius: 2,
                                }}>
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
            <CategorySelector
                modalVisible={categoryModalVisible}
                openModal={openCategoryModal}
                hideModal={hideCategoryModal}
                setHelpCategoryIds={setHelpCategoryIds}
                categoryIds={helpCategoryIds}
            />
            {renderPickerCategoryForm()}
            {renderSelectedCategories()}
        </View>
    );
}
