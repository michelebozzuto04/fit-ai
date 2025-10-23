import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface SurveySelectable1Props {
    selection: string;
    isSelected?: boolean;
    onPress: () => void;
}

const SurveySelectable1: React.FC<SurveySelectable1Props> = ({
    selection,
    isSelected = false,
    onPress
}) => {
    return (
        <TouchableRipple
            onPress={onPress}
            style={[
                styles.container,
                isSelected && styles.selectedContainer
            ]}
        >
            <Text style={[
                styles.selectionText,
                isSelected && styles.selectedText
            ]}>
                {selection}
            </Text>
        </TouchableRipple>
    );
};

export default SurveySelectable1;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        marginBottom: 15
    },
    selectedContainer: {
        backgroundColor: '#000',
    },
    selectionText: {
        fontSize: 18,
        fontWeight: '400'
    },
    selectedText: {
        color: '#fff'
    },
})