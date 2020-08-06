import React, { useContext, useState } from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { CategoryContext } from '../../../../store/contexts/categoryContext';

import Button from '../../../UI/button';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

export default function CategorySelector() {
    const { categories } = useContext(CategoryContext);
    const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

    const selectCategory = (categoryId) =>
        setSelectedCategoriesId([...selectedCategoriesId, categoryId]);
    const removeCategory = (categoryId) => {
        const removeCategoryId = selectedCategoriesId.filter(
            (categoryIdFromState) => categoryIdFromState !== categoryId,
        );
        setSelectedCategoriesId(removeCategoryId);
    };

    return (
        <Modal visible transparent>
            <TouchableOpacity style={styles.container}>
                <TouchableWithoutFeedback>
                    <View style={styles.content}>
                        <Text style={styles.title}>Escolha as categorias</Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {categories?.map((category) => (
                                <TouchableOpacity
                                    key={category._id}
                                    onPress={() => {
                                        selectedCategoriesId.includes(
                                            category._id,
                                        )
                                            ? removeCategory(category._id)
                                            : selectCategory(category._id);
                                    }}>
                                    <Text
                                        style={
                                            selectedCategoriesId.includes(
                                                category._id,
                                            )
                                                ? styles.selectedCategory
                                                : styles.notSelectedCategory
                                        }>
                                        {category.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Button title="concluir" large type="warning" />
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}
