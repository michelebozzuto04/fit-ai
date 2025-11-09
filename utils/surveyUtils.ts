// utils/surveyUtils.ts
// Helper function to transform survey data to API format

export const transformSurveyDataForAPI = (surveyData: Record<string, any>) => {
    // Transform the survey data to match the backend expected format
    return {
        // Personal Info
        birthDate: surveyData.birthDate || '',
        gender: surveyData.gender || 'Male',
        height: surveyData.height ? `${surveyData.height} cm` : '170 cm',

        // Weight Info
        currentWeight: surveyData.currentWeight ? `${surveyData.currentWeight} kg` : '70 kg',
        desiredWeight: surveyData.desiredWeight ? `${surveyData.desiredWeight} kg` : '70 kg',

        // Goals & Activity
        mainGoal: surveyData.mainGoal || 'Lose weight',
        activityLevel: surveyData.activityLevel || 'Light Active',
        fitnessExperience: surveyData.fitnessExperience || 'Beginner',
        workoutsPerWeek: surveyData.workoutsPerWeek || 3,

        // Training & Diet
        desiredTrainingActivity: surveyData.desiredTrainingActivity || [],
        dietType: surveyData.dietType || 'Classic',
    };
};

// Validate survey data before sending
export const validateSurveyData = (surveyData: Record<string, any>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Required fields
    if (!surveyData.birthDate) errors.push('Birth date is required');
    if (!surveyData.gender) errors.push('Gender is required');
    if (!surveyData.height) errors.push('Height is required');
    if (!surveyData.currentWeight) errors.push('Current weight is required');
    if (!surveyData.desiredWeight) errors.push('Desired weight is required');
    if (!surveyData.mainGoal) errors.push('Main goal is required');
    if (!surveyData.fitnessExperience) errors.push('Fitness experience is required');
    if (!surveyData.workoutsPerWeek) errors.push('Workouts per week is required');

    // Validate array fields
    if (!Array.isArray(surveyData.desiredTrainingActivity) || surveyData.desiredTrainingActivity.length === 0) {
        errors.push('At least one training activity is required');
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

// Format date for display
export const formatDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Calculate age from birthdate
export const calculateAge = (birthDate: string): number => {
    const [day, month, year] = birthDate.split('/');
    const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};