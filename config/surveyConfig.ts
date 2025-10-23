// surveyConfig.ts
import Step1 from '../app/surveySteps/Step1';
import Step2 from '../app/surveySteps/Step2';
import Step3 from '../app/surveySteps/Step3';
import Step4 from '../app/surveySteps/Step4';
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
        key: 'weight',
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
    // Add all 15 steps here...
];