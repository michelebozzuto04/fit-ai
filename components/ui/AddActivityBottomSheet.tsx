import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

type AddActivityBottomSheetProps = {};

const AddActivityBottomSheet = forwardRef<BottomSheetModal, AddActivityBottomSheetProps>(
    (props, ref) => {
        const snapPoints = useMemo(() => ['35%'], []);

        // Render backdrop component
        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                    pressBehavior="close"
                />
            ),
            []
        );

        const handleOpenCamera = () => {
            // Close the bottom sheet first
            if (ref && 'current' in ref && ref.current) {
                ref.current.dismiss();
            }
            // Navigate to camera screen
            setTimeout(() => {
                router.push('/camera/camera');
            }, 300);
        };

        const handleManualEntry = () => {
            // Close the bottom sheet
            if (ref && 'current' in ref && ref.current) {
                ref.current.dismiss();
            }
            // Navigate to manual entry or open form
            console.log('Manual entry selected');
        };

        return (
            <BottomSheetModal
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.handleIndicator}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={styles.title}>Add Activity</Text>

                    <TouchableRipple
                        style={styles.option}
                        onPress={handleOpenCamera}
                        rippleColor="rgba(0, 0, 0, 0.1)"
                    >
                        <View style={styles.optionContent}>
                            <View style={styles.iconContainer}>
                                {/* <Image
                                    source={require('../../assets/icons/camera.png')}
                                    style={styles.icon}
                                /> */}
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.optionTitle}>Take Photo</Text>
                                <Text style={styles.optionDescription}>
                                    Capture activity with camera
                                </Text>
                            </View>
                            <Text style={styles.arrow}>›</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple
                        style={styles.option}
                        onPress={handleManualEntry}
                        rippleColor="rgba(0, 0, 0, 0.1)"
                    >
                        <View style={styles.optionContent}>
                            <View style={styles.iconContainer}>
                                {/* <Image
                                    source={require('../../assets/icons/edit.png')}
                                    style={styles.icon}
                                /> */}
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.optionTitle}>Manual Entry</Text>
                                <Text style={styles.optionDescription}>
                                    Add activity details manually
                                </Text>
                            </View>
                            <Text style={styles.arrow}>›</Text>
                        </View>
                    </TouchableRipple>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

AddActivityBottomSheet.displayName = 'AddActivityBottomSheet';

export default AddActivityBottomSheet;

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handleIndicator: {
        backgroundColor: '#D1D5DB',
        width: 40,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1F2937',
    },
    option: {
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F9FAFB',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    arrow: {
        fontSize: 24,
        color: '#9CA3AF',
        marginLeft: 8,
    },
});