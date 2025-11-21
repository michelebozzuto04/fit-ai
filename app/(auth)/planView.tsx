// app/(auth)/planPreview.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { usePlan } from '../../contexts/PlanContext';

const PlanView = () => {
    const router = useRouter();
    const { plan, userProfile, currentDay, setCurrentDay } = usePlan();
    const [selectedDay, setSelectedDay] = useState(currentDay);

    if (!plan) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Loading your plan...</Text>
            </View>
        );
    }

    const currentDayPlan = plan.days[selectedDay - 1];

    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Transformation Plan</Text>
                <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Overview Card */}
                <View style={styles.overviewCard}>
                    <Text style={styles.overviewTitle}>{plan.summary.goalOverview}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{plan.nutritionGuidelines.dailyCalories}</Text>
                            <Text style={styles.statLabel}>Daily Calories</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{plan.days.length}</Text>
                            <Text style={styles.statLabel}>Days</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>
                                {plan.days.filter(d => !d.isRestDay).length}
                            </Text>
                            <Text style={styles.statLabel}>Workouts</Text>
                        </View>
                    </View>
                </View>

                {/* User Profile Card (if available) */}
                {userProfile && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Your Profile</Text>
                        <View style={styles.profileGrid}>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileLabel}>Current Weight</Text>
                                <Text style={styles.profileValue}>{userProfile.currentWeight} kg</Text>
                            </View>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileLabel}>Target Weight</Text>
                                <Text style={styles.profileValue}>{userProfile.desiredWeight} kg</Text>
                            </View>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileLabel}>BMI</Text>
                                <Text style={styles.profileValue}>{userProfile.metrics.currentBMI}</Text>
                            </View>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileLabel}>TDEE</Text>
                                <Text style={styles.profileValue}>{userProfile.metrics.tdee} cal</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Macros Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Daily Macros</Text>
                    <View style={styles.macrosContainer}>
                        <View style={styles.macroItem}>
                            <View style={[styles.macroCircle, { backgroundColor: '#4CAF50' }]}>
                                <Ionicons name="nutrition" size={24} color="#fff" />
                            </View>
                            <Text style={styles.macroValue}>
                                {plan.nutritionGuidelines.macroSplit.proteinGrams}g
                            </Text>
                            <Text style={styles.macroLabel}>Protein</Text>
                            <Text style={styles.macroPercent}>
                                {plan.nutritionGuidelines.macroSplit.proteinPercent}%
                            </Text>
                        </View>

                        <View style={styles.macroItem}>
                            <View style={[styles.macroCircle, { backgroundColor: '#FF9800' }]}>
                                <Ionicons name="flame" size={24} color="#fff" />
                            </View>
                            <Text style={styles.macroValue}>
                                {plan.nutritionGuidelines.macroSplit.carbsGrams}g
                            </Text>
                            <Text style={styles.macroLabel}>Carbs</Text>
                            <Text style={styles.macroPercent}>
                                {plan.nutritionGuidelines.macroSplit.carbsPercent}%
                            </Text>
                        </View>

                        <View style={styles.macroItem}>
                            <View style={[styles.macroCircle, { backgroundColor: '#2196F3' }]}>
                                <Ionicons name="water" size={24} color="#fff" />
                            </View>
                            <Text style={styles.macroValue}>
                                {plan.nutritionGuidelines.macroSplit.fatsGrams}g
                            </Text>
                            <Text style={styles.macroLabel}>Fats</Text>
                            <Text style={styles.macroPercent}>
                                {plan.nutritionGuidelines.macroSplit.fatsPercent}%
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Day Selector */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Select Day</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.daySelector}
                    >
                        {plan.days.map((day) => (
                            <TouchableOpacity
                                key={day.day}
                                style={[
                                    styles.dayButton,
                                    selectedDay === day.day && styles.dayButtonActive,
                                    day.isRestDay && styles.dayButtonRest
                                ]}
                                onPress={() => setSelectedDay(day.day)}
                            >
                                <Text
                                    style={[
                                        styles.dayButtonText,
                                        selectedDay === day.day && styles.dayButtonTextActive
                                    ]}
                                >
                                    Day {day.day}
                                </Text>
                                {day.isRestDay && (
                                    <Text style={styles.restBadge}>Rest</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Current Day Details */}
                {currentDayPlan && (
                    <>
                        {/* Day Focus */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="flag" size={24} color="#000" />
                                <Text style={styles.cardTitle}>Day {currentDayPlan.day} Focus</Text>
                            </View>
                            <Text style={styles.focusText}>{currentDayPlan.focus}</Text>
                        </View>

                        {/* Workout */}
                        {!currentDayPlan.isRestDay && currentDayPlan.workout && (
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Ionicons name="barbell" size={24} color="#000" />
                                    <Text style={styles.cardTitle}>Workout</Text>
                                </View>
                                <View style={styles.workoutInfo}>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Type:</Text>
                                        <Text style={styles.infoValue}>{currentDayPlan.workout.type}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Duration:</Text>
                                        <Text style={styles.infoValue}>{currentDayPlan.workout.duration} min</Text>
                                    </View>
                                    <Text style={styles.exerciseCount}>
                                        {currentDayPlan.workout.exercises.length} exercises
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* Meals */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="restaurant" size={24} color="#000" />
                                <Text style={styles.cardTitle}>Meals</Text>
                            </View>

                            {Object.entries(currentDayPlan.meals).map(([mealType, meal]) => {
                                if (!meal) return null;

                                return (
                                    <View key={mealType} style={styles.mealItem}>
                                        <Text style={styles.mealType}>
                                            {mealType.charAt(0).toUpperCase() + mealType.slice(1).replace(/\d+/g, ' $&')}
                                        </Text>
                                        <Text style={styles.mealName}>{meal.name}</Text>
                                        <View style={styles.mealNutrition}>
                                            <Text style={styles.nutritionText}>{meal.calories} cal</Text>
                                            <Text style={styles.nutritionText}>P: {meal.protein}g</Text>
                                            <Text style={styles.nutritionText}>C: {meal.carbs}g</Text>
                                            <Text style={styles.nutritionText}>F: {meal.fats}g</Text>
                                        </View>
                                    </View>
                                );
                            })}

                            {/* Daily Totals */}
                            <View style={styles.dailyTotals}>
                                <Text style={styles.totalsTitle}>Daily Totals</Text>
                                <View style={styles.totalsRow}>
                                    <Text style={styles.totalItem}>
                                        {currentDayPlan.dailyTotals.calories} cal
                                    </Text>
                                    <Text style={styles.totalItem}>
                                        P: {currentDayPlan.dailyTotals.protein}g
                                    </Text>
                                    <Text style={styles.totalItem}>
                                        C: {currentDayPlan.dailyTotals.carbs}g
                                    </Text>
                                    <Text style={styles.totalItem}>
                                        F: {currentDayPlan.dailyTotals.fats}g
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}

                {/* Start Button */}
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => {
                        setCurrentDay(1);
                        // Navigate to main plan view/dashboard
                        router.push('/(tabs)/home');
                    }}
                >
                    <Text style={styles.startButtonText}>Start This Plan</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

export default PlanView;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk-Bold'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'Manrope-Medium'
    },
    overviewCard: {
        margin: 20,
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 16
    },
    overviewTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk-Bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statBox: {
        alignItems: 'center'
    },
    statValue: {
        fontSize: 28,
        fontFamily: 'SpaceGrotesk-Bold'
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.6)',
        marginTop: 5
    },
    card: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk-Bold',
        marginLeft: 10
    },
    profileGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        marginTop: 10
    },
    profileItem: {
        width: '47%',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 12
    },
    profileLabel: {
        fontSize: 12,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 5
    },
    profileValue: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk-Bold'
    },
    macrosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    macroItem: {
        alignItems: 'center'
    },
    macroCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    macroValue: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk-Bold'
    },
    macroLabel: {
        fontSize: 12,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.6)',
        marginTop: 5
    },
    macroPercent: {
        fontSize: 11,
        fontFamily: 'Manrope-Regular',
        color: 'rgba(0,0,0,0.4)',
        marginTop: 2
    },
    daySelector: {
        marginTop: 15
    },
    dayButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#f8f9fa',
        marginRight: 10,
        minWidth: 80,
        alignItems: 'center'
    },
    dayButtonActive: {
        backgroundColor: '#000'
    },
    dayButtonRest: {
        backgroundColor: '#fff3cd',
        borderWidth: 1,
        borderColor: '#ffc107'
    },
    dayButtonText: {
        fontSize: 14,
        fontFamily: 'Manrope-Bold',
        color: '#000'
    },
    dayButtonTextActive: {
        color: '#fff'
    },
    restBadge: {
        fontSize: 10,
        fontFamily: 'Manrope-Medium',
        color: '#ff9800',
        marginTop: 4
    },
    focusText: {
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.7)',
        lineHeight: 24
    },
    workoutInfo: {
        marginTop: 10
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    infoLabel: {
        fontSize: 14,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.6)'
    },
    infoValue: {
        fontSize: 14,
        fontFamily: 'Manrope-Bold'
    },
    exerciseCount: {
        fontSize: 14,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.6)',
        marginTop: 10
    },
    mealItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    mealType: {
        fontSize: 12,
        fontFamily: 'Manrope-Bold',
        color: 'rgba(0,0,0,0.4)',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    mealName: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk-Bold',
        marginBottom: 8
    },
    mealNutrition: {
        flexDirection: 'row',
        gap: 15
    },
    nutritionText: {
        fontSize: 13,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.6)'
    },
    dailyTotals: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 12
    },
    totalsTitle: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk-Bold',
        marginBottom: 10
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    totalItem: {
        fontSize: 13,
        fontFamily: 'Manrope-Bold'
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        marginHorizontal: 20,
        padding: 18,
        borderRadius: 16,
        gap: 10
    },
    startButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'SpaceGrotesk-Bold'
    }
});