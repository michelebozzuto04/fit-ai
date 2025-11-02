// surveyConfig.ts
import Step16 from '@/app/surveySteps/Step16';
import Step1 from '../app/surveySteps/Step1';
import Step10 from '../app/surveySteps/Step10';
import Step11 from '../app/surveySteps/Step11';
import Step12 from '../app/surveySteps/Step12';
import Step13 from '../app/surveySteps/Step13';
import Step14 from '../app/surveySteps/Step14';
import Step15 from '../app/surveySteps/Step15';
import Step2 from '../app/surveySteps/Step2';
import Step3 from '../app/surveySteps/Step3';
import Step4 from '../app/surveySteps/Step4';
import Step5 from '../app/surveySteps/Step5';
import Step6 from '../app/surveySteps/Step6';
import Step7 from '../app/surveySteps/Step7';
import Step8 from '../app/surveySteps/Step8';
import Step9 from '../app/surveySteps/Step9';
// ... import all 15 steps

export interface StepConfig {
    component: React.ComponentType<StepProps>;
    key: string;
    validation?: (value: any) => boolean;
}

export interface StepProps {
    value: any;
    onChange: (value: any) => void;
}

export const surveySteps: StepConfig[] = [
    {
        component: Step1,
        key: 'gender',
        validation: (value) => !!value && value.length > 0
    },
    {
        component: Step2,
        key: 'currentWeight',
        validation: (value) => !!value
    },
    {
        component: Step3,
        key: 'height',
        validation: (value) => !!value
    },
    {
        component: Step4,
        key: 'birthDate',
        validation: (value) => !!value
    },
    {
        component: Step5,
        key: '',
    },
    {
        component: Step6,
        key: 'mainGoal',
        validation: (value) => !!value
    },
    {
        component: Step7,
        key: 'desiredWeight',
        validation: (value) => !!value
    },
    {
        component: Step8,
        key: 'activityLevel',
        validation: (value) => !!value
    },
    {
        component: Step9,
        key: '',
    },
    {
        component: Step10,
        key: 'fitnessExperience',
        validation: (value) => !!value
    },
    {
        component: Step11,
        key: 'desiredTrainingActivity',
        validation: (value) => Array.isArray(value) && value.length > 0 // At least one selection
    },
    {
        component: Step12,
        key: 'workoutsPerWeek',
        validation: (value) => !!value
    },
    {
        component: Step13,
        key: 'dietType',
        validation: (value) => !!value
    },
    {
        component: Step14,
        key: '',
    },
    {
        component: Step15,
        key: '',
    },
    {
        component: Step16,
        key: '',
    },
];