import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Step16Props {
    value: any;
    onChange: (value: any) => void;
}

const Step16: React.FC<Step16Props> = ({ value, onChange }) => {
    const data = value;

    return (
        <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
            <View>
                <Text style={styles.title}>Let’s Create Your Transformation Plan</Text>
                <Text style={styles.subtitle}>
                    We will create a personalized plan tailored to your needs.
                </Text>
            </View>

            <SummaryCard
                items={[
                    { label: 'Main goal', value: data?.mainGoal || 'N/A' },
                    { label: 'Current weight', value: data?.currentWeight || 'N/A' },
                    { label: 'Target weight', value: data?.desiredWeight || 'N/A' },
                    { label: 'Workouts per week', value: data?.workoutsPerWeek },
                    { label: 'Activities', value: data?.desiredTrainingActivity.join(', ') },
                    { label: 'Diet', value: data?.dietType }
                ]}
            />
        </ScrollView>
    );
};

interface SummaryCardProps {
    items: Array<{ label: string; value: string }>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ items }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {items.map((item, index) => (
                    <View key={index}>
                        <View style={styles.cardRow}>
                            <Text style={styles.cardLabel}>{item.label}</Text>
                            <Text style={styles.cardValue}>{item.value}</Text>
                        </View>
                        {index < items.length - 1 && <View style={styles.separator} />}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Step16;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    title: {
        fontSize: 30,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.5)',
        marginTop: 10,
        marginBottom: 30
    },
    summaryContainer: {
        gap: 15
    },
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e9ecef',
        marginBottom: 20
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    cardContent: {
        gap: 0
    },
    cardRow: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardLabel: {
        fontSize: 15,
        color: 'rgba(0,0,0,0.4)',
        fontWeight: '500'
    },
    cardValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        textAlign: 'right',
        flex: 1,
        marginLeft: 10
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    footer: {
        marginTop: 30,
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#e3f2fd',
        borderRadius: 12
    },
    footerText: {
        fontSize: 15,
        color: '#1976d2',
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 22
    }
});