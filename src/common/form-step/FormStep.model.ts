export enum EStepKey {
  Step1 = 'Step 1',
  Step2 = 'Step 2',
  Step3 = 'Step 3',
  Step4 = 'Step 4',
}

export const stepList = [
  { title: 'Step1', key: EStepKey.Step1 },
  { title: 'Step2', key: EStepKey.Step2 },
  { title: 'Step3', key: EStepKey.Step3 },
  { title: 'Step4', key: EStepKey.Step4 },
];

export interface IBaseFormStepProps {
  stepKey: string;
}
