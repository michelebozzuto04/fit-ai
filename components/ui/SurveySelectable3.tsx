import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface SurveySelectable3Props {
    selection: string;
    iconSource: ImageSourcePropType;
    isSelected?: boolean;
    onPress: () => void;
}

const SurveySelectable3: React.FC<SurveySelectable3Props> = ({
    selection,
    iconSource,
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
            <View style={styles.rowContainer} >
                <View
                    style={[
                        styles.iconContainer,
                        isSelected && styles.selectedIconContainer
                    ]}
                >
                    <Image source={iconSource} style={styles.icon} />
                </View>
                <Text style={[
                    styles.selectionText,
                    isSelected && styles.selectedText
                ]}>
                    {selection}
                </Text>
            </View>
        </TouchableRipple>
    );
};

export default SurveySelectable3;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        marginBottom: 15
    },
    selectedContainer: {
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    iconContainer: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    selectedIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    selectionText: {
        fontSize: 16,
        fontWeight: '500'
    },
    selectedText: {
        color: '#fff'
    }
})