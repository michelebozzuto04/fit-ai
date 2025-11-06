import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface SurveySelectable2Props {
    selection: string;
    description: string;
    isSelected?: boolean;
    onPress: () => void;
}

const SurveySelectable2: React.FC<SurveySelectable2Props> = ({
    selection,
    description,
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
            <>
                <Text style={[
                    styles.selectionText,
                    isSelected && styles.selectedText
                ]}>
                    {selection}
                </Text>
                <Text style={[
                    styles.descriptionText,
                    isSelected && styles.selectedDescriptionText
                ]}>
                    {description}
                </Text>
            </>
        </TouchableRipple>
    );
};

export default SurveySelectable2;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        marginBottom: 15
    },
    selectedContainer: {
        backgroundColor: '#000',
    },
    selectionText: {
        fontSize: 16,
        fontFamily: 'Manrope-SemiBold'
    },
    selectedText: {
        color: '#fff'
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0, 0, 0, 0.3)'
    },
    selectedDescriptionText: {
        color: 'rgba(255, 255, 255, 0.7)'
    },
})