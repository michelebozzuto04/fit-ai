// contexts/PlanContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Types
interface Meal {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    prepTime: number;
}

interface Exercise {
    name: string;
    sets: number | string;
    reps: string;
    rest: number;
    notes: string;
}

interface Workout {
    type: string;
    duration: number;
    exercises: Exercise[];
    warmup: string;
    cooldown: string;
}

interface DayPlan {
    day: number;
    focus: string;
    isRestDay: boolean;
    workout?: Workout;
    meals: {
        breakfast: Meal;
        lunch: Meal;
        dinner: Meal;
        snack1?: Meal;
        snack2?: Meal;
    };
    dailyTotals: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
    tips: string[];
}

interface TransformationPlan {
    summary: {
        goalOverview: string;
        keyPrinciples: string[];
        expectedResults: string;
    };
    nutritionGuidelines: {
        dailyCalories: number;
        macroSplit: {
            proteinGrams: number;
            proteinPercent: number;
            carbsGrams: number;
            carbsPercent: number;
            fatsGrams: number;
            fatsPercent: number;
        };
        mealTiming: string;
        hydration: string;
        supplements: string[];
    };
    days: DayPlan[];
    weeklyProgression: any;
    progressTracking: any;
    motivationalTips: string[];
}

interface UserProfile {
    birthDate: string;
    gender: string;
    height: number;
    currentWeight: string;
    desiredWeight: string;
    mainGoal: string;
    activityLevel: string;
    fitnessExperience: string;
    workoutsPerWeek: number;
    dietType: string;
    desiredTrainingActivity: string[];
    metrics: {
        age: number;
        currentBMI: string;
        targetBMI: string;
        bmr: number;
        tdee: number;
        targetCalories: number;
        weightToLose: string;
        estimatedWeeks: number;
    };
}

interface DayProgress {
    completed: boolean;
    workoutCompleted: boolean;
    mealsCompleted: {
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
        snack1: boolean;
        snack2: boolean;
    };
    notes: string;
    date: string;
}

interface PlanContextType {
    // Plan data
    plan: TransformationPlan | null;
    userProfile: UserProfile | null;
    planId: string | null;
    generatedAt: string | null;

    // Current state
    currentDay: number;

    // Progress tracking
    progress: Record<number, DayProgress>;

    // Actions
    setPlan: (planData: any) => void;
    clearPlan: () => void;
    setCurrentDay: (day: number) => void;
    updateDayProgress: (day: number, progress: Partial<DayProgress>) => void;
    markMealCompleted: (day: number, mealType: string) => void;
    markWorkoutCompleted: (day: number) => void;

    // Getters
    getCurrentDayPlan: () => DayPlan | null;
    getDayProgress: (day: number) => DayProgress | null;
    getCompletionPercentage: () => number;
    getTotalMealsCompleted: () => number;
    getTotalWorkoutsCompleted: () => number;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const STORAGE_KEYS = {
    PLAN: '@transformation_plan',
    USER_PROFILE: '@user_profile',
    PLAN_ID: '@plan_id',
    GENERATED_AT: '@generated_at',
    CURRENT_DAY: '@current_day',
    PROGRESS: '@plan_progress'
};

export const PlanProvider = ({ children }: { children: ReactNode }) => {
    const [plan, setPlanState] = useState<TransformationPlan | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [planId, setPlanId] = useState<string | null>(null);
    const [generatedAt, setGeneratedAt] = useState<string | null>(null);
    const [currentDay, setCurrentDayState] = useState<number>(1);
    const [progress, setProgress] = useState<Record<number, DayProgress>>({});

    // Load data from AsyncStorage on mount
    useEffect(() => {
        loadDataFromStorage();
    }, []);

    const loadDataFromStorage = async () => {
        try {
            const [
                storedPlan,
                storedProfile,
                storedPlanId,
                storedGeneratedAt,
                storedCurrentDay,
                storedProgress
            ] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.PLAN),
                AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE),
                AsyncStorage.getItem(STORAGE_KEYS.PLAN_ID),
                AsyncStorage.getItem(STORAGE_KEYS.GENERATED_AT),
                AsyncStorage.getItem(STORAGE_KEYS.CURRENT_DAY),
                AsyncStorage.getItem(STORAGE_KEYS.PROGRESS)
            ]);

            if (storedPlan) setPlanState(JSON.parse(storedPlan));
            if (storedProfile) setUserProfile(JSON.parse(storedProfile));
            if (storedPlanId) setPlanId(storedPlanId);
            if (storedGeneratedAt) setGeneratedAt(storedGeneratedAt);
            if (storedCurrentDay) setCurrentDayState(parseInt(storedCurrentDay));
            if (storedProgress) setProgress(JSON.parse(storedProgress));
        } catch (error) {
            console.error('Error loading plan data from storage:', error);
        }
    };

    const setPlan = async (planData: any) => {
        try {
            const planToStore = planData.plan || planData;
            const profileToStore = planData.userProfile || null;
            const idToStore = planData.planId || `PLAN_${Date.now()}`;
            const timestampToStore = planData.generatedAt || new Date().toISOString();

            // Update state
            setPlanState(planToStore);
            setUserProfile(profileToStore);
            setPlanId(idToStore);
            setGeneratedAt(timestampToStore);
            setCurrentDayState(1);

            // Initialize progress for all days
            const initialProgress: Record<number, DayProgress> = {};
            planToStore.days.forEach((day: DayPlan) => {
                initialProgress[day.day] = {
                    completed: false,
                    workoutCompleted: false,
                    mealsCompleted: {
                        breakfast: false,
                        lunch: false,
                        dinner: false,
                        snack1: false,
                        snack2: false
                    },
                    notes: '',
                    date: ''
                };
            });
            setProgress(initialProgress);

            // Save to AsyncStorage
            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(planToStore)),
                AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profileToStore)),
                AsyncStorage.setItem(STORAGE_KEYS.PLAN_ID, idToStore),
                AsyncStorage.setItem(STORAGE_KEYS.GENERATED_AT, timestampToStore),
                AsyncStorage.setItem(STORAGE_KEYS.CURRENT_DAY, '1'),
                AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(initialProgress))
            ]);

            console.log('Plan saved successfully!');
        } catch (error) {
            console.error('Error saving plan:', error);
            throw error;
        }
    };

    const clearPlan = async () => {
        try {
            setPlanState(null);
            setUserProfile(null);
            setPlanId(null);
            setGeneratedAt(null);
            setCurrentDayState(1);
            setProgress({});

            await Promise.all([
                AsyncStorage.removeItem(STORAGE_KEYS.PLAN),
                AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE),
                AsyncStorage.removeItem(STORAGE_KEYS.PLAN_ID),
                AsyncStorage.removeItem(STORAGE_KEYS.GENERATED_AT),
                AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_DAY),
                AsyncStorage.removeItem(STORAGE_KEYS.PROGRESS)
            ]);

            console.log('Plan cleared successfully!');
        } catch (error) {
            console.error('Error clearing plan:', error);
        }
    };

    const setCurrentDay = async (day: number) => {
        if (!plan || day < 1 || day > plan.days.length) return;

        setCurrentDayState(day);
        await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_DAY, day.toString());
    };

    const updateDayProgress = async (day: number, dayProgress: Partial<DayProgress>) => {
        const updatedProgress = {
            ...progress,
            [day]: {
                ...progress[day],
                ...dayProgress,
                date: dayProgress.date || new Date().toISOString()
            }
        };

        setProgress(updatedProgress);
        await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updatedProgress));
    };

    const markMealCompleted = async (day: number, mealType: string) => {
        if (!progress[day]) return;

        const updatedProgress = {
            ...progress,
            [day]: {
                ...progress[day],
                mealsCompleted: {
                    ...progress[day].mealsCompleted,
                    [mealType]: true
                }
            }
        };

        setProgress(updatedProgress);
        await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updatedProgress));
    };

    const markWorkoutCompleted = async (day: number) => {
        if (!progress[day]) return;

        const updatedProgress = {
            ...progress,
            [day]: {
                ...progress[day],
                workoutCompleted: true
            }
        };

        setProgress(updatedProgress);
        await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updatedProgress));
    };

    const getCurrentDayPlan = (): DayPlan | null => {
        if (!plan || currentDay < 1 || currentDay > plan.days.length) return null;
        return plan.days[currentDay - 1];
    };

    const getDayProgress = (day: number): DayProgress | null => {
        return progress[day] || null;
    };

    const getCompletionPercentage = (): number => {
        if (!plan) return 0;

        const totalDays = plan.days.length;
        const completedDays = Object.values(progress).filter(p => p.completed).length;

        return Math.round((completedDays / totalDays) * 100);
    };

    const getTotalMealsCompleted = (): number => {
        return Object.values(progress).reduce((total, dayProgress) => {
            return total + Object.values(dayProgress.mealsCompleted).filter(Boolean).length;
        }, 0);
    };

    const getTotalWorkoutsCompleted = (): number => {
        return Object.values(progress).filter(p => p.workoutCompleted).length;
    };

    const value: PlanContextType = {
        plan,
        userProfile,
        planId,
        generatedAt,
        currentDay,
        progress,
        setPlan,
        clearPlan,
        setCurrentDay,
        updateDayProgress,
        markMealCompleted,
        markWorkoutCompleted,
        getCurrentDayPlan,
        getDayProgress,
        getCompletionPercentage,
        getTotalMealsCompleted,
        getTotalWorkoutsCompleted
    };

    return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (context === undefined) {
        throw new Error('usePlan must be used within a PlanProvider');
    }
    return context;
};