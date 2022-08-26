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
import styles from './styles';
import { Icon } from 'react-native-elements';
import CategoryDescriptionModal from '../categoryDescription';
import { CategoryContext } from '../../../../store/contexts/categoryContext';
import FilterButtons from '../../../UI/button/FilterButtons';
import colors from '../../../../../assets/styles/colorVariables';

export default function CategoryList({
    visible,
    setVisible,
    isHistoryPage,
    setSelectedMarker,
    selectedMarker,
}) {
    const [descriptionModalVisible, setDescriptionModalVisible] =
        useState(false);
    const {
        categories,
        setSelectedCategories,
        selectedCategories,
        setFilterCategories,
    } = useContext(CategoryContext);
    const [selectedMarkerType, setSelectedMarkerType] = useState([]);

    const includeCategoryIntoSelectedCategories = (categoryId) =>
        setSelectedCategories([...selectedCategories, categoryId]);

    const removeCategoryFromSelectedCategories = (categoryId) => {
        const removeCategoryId = selectedCategories.filter(
            (categoryIdFromState) => categoryIdFromState !== categoryId,
        );
        setSelectedCategories(removeCategoryId);
    };
    const getCategoryActiveOpacity = (categoryId) => {
        if (
            selectedCategories.includes(categoryId) ||
            selectedCategories.length < 3
        ) {
            return 0;
        } else {
            return 1;
        }
    };

    const selectCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            removeCategoryFromSelectedCategories(categoryId);
        } else if (selectedCategories.length < 3) {
            includeCategoryIntoSelectedCategories(categoryId);
        }
    };

    const getCategoryStyle = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            return styles.selectedCategory;
        } else if (selectedCategories.length >= 3) {
            return styles.unvailableToSelectCategory;
        } else {
            return styles.notSelectedCategory;
        }
    };

    async function filterHelplist() {
        setSelectedCategories(selectedCategories);
        setSelectedMarker(selectedMarkerType);
        setFilterCategories(true);
        setVisible(!visible);
    }
    async function clearFilterHelplist() {
        setSelectedCategories([]);
        setSelectedMarker([]);
        setVisible(!visible);
    }
    const renderCategories = () => (
        <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
        >
            {categories.map((category) => {
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
    const renderFilterButtons = () => {
        if (selectedCategories.length || selectedMarker.length) {
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

    const renderOnGoingFinishedButtons = () => {
        if (isHistoryPage) {
            return (
                <View style={styles.onGoingFinishedButtonsArea}>
                    <View
                        style={[
                            styles.onGoingFinishedButtons,
                            { marginRight: 10 },
                        ]}
                    >
                        <TouchableOpacity>
                            <Text style={styles.infoText}>EM ANDAMENTO</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.onGoingFinishedButtons}>
                        <TouchableOpacity>
                            <Text style={styles.infoText}>FINALIZADO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => setVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => {
                    setVisible(false);
                }}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        <Text style={styles.filterTitle}>FILTRO</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible(false);
                            }}
                            style={styles.closeIcon}
                        >
                            <Icon
                                name="times-circle"
                                type="font-awesome"
                                color={colors.danger}
                                size={35}
                            />
                        </TouchableOpacity>
                        {renderOnGoingFinishedButtons()}

                        <FilterButtons
                            setSelectedMarkerType={setSelectedMarkerType}
                            selectedMarker={selectedMarker}
                        />
                        <View style={styles.contentHeader}>
                            <View style={styles.categoryHeader}>
                                <Text style={styles.categoryTitle}>
                                    CATEGORIAS
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setDescriptionModalVisible(
                                            !descriptionModalVisible,
                                        );
                                    }}
                                >
                                    <Icon
                                        name="question-circle"
                                        type="font-awesome"
                                        color="#C4C4C4"
                                        size={35}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.warning}>(No máximo 3)</Text>
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
