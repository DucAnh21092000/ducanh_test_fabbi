import { Form, InputNumber, Select } from 'antd';
import { IBaseFormStepProps } from '../../../../../common/form-step/FormStep.model';

const StepOne = (props: IBaseFormStepProps) => {
  const { stepKey } = props;
  const mealOptions = [
    {
      label: 'Lunch',
      value: 'lunch',
    },
    {
      label: 'Dinner',
      value: 'dinner',
    },
  ];

  const rules = {
    meal: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
  };
  return (
    <div key={stepKey}>
      <Form.Item name="meal" label="Please Select a meal" required rules={rules.meal}>
        <Select options={mealOptions} placeholder="Select an option" />
      </Form.Item>
      <Form.Item
        name="peopleNumber"
        label="Please Enter Number of people"
        required
        rules={rules.meal}
      >
        <InputNumber min={0} controls />
      </Form.Item>
    </div>
  );
};

export default StepOne;
