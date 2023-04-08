import React from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { IconButton } from '../IconButton';
import { styles } from './styles';
export const SearchBar = ({ value, setValue, placeholder }) => {
    return (
        <View style={styles.searchBarContainer}>
            <Icon
                name="search"
                style={styles.searchIcon}
                size={20}
                color={'#3535354d'}
            />
            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder}
                onChangeText={(text) => setValue(text)}
            />
            <View style={styles.buttonContainer}>
                {!!value && (
                    <IconButton
                        icon="close"
                        theme="dark"
                        iconSize={16}
                        customStyle={styles.iconButtonStyle}
                        onPress={() => setValue('')}
                    />
                )}
            </View>
        </View>
    );
};
