import { useForm, useWatch } from 'antd/es/form/Form';
import FormStep from '../../../common/form-step/FormStep';
import { EStepKey, stepList } from '../../../common/form-step/FormStep.model';
import { useCreateTodo } from './context/CreateToDoContext';
import StepOne from './form-step/step1/StepOne';
import StepTwo from './form-step/step2/StepTwo';
import StepThree from './form-step/step3/StepThree';
import Summary from './form-step/step4/Summary';
import { Col, Modal, Row } from 'antd';
import useUtils from '../../../common/func/until';

const CreateTodo = () => {
  const [form] = useForm();
  const { formData, setFinalFormData, setSelectedMeal, setFinalRestaurant } = useCreateTodo();
  const { meal, restaurant } = useWatch([], form) ?? {};
  const { useBoolean } = useUtils();
  const [isOpenModal, setOpenModal, closeModal] = useBoolean();
  const handleValidate = async () => {
    let result = true;
    try {
      await form.validateFields();
      result = true;
    } catch (error) {
      result = false;
      console.log(error);
    }
    return result;
  };
  console.log(formData);

  const handleChangeStep = (currentStep: EStepKey) => {
    const formValue = form.getFieldsValue();
    if (currentStep === EStepKey.Step1) {
      setSelectedMeal?.(meal);
    }
    if (currentStep === EStepKey.Step2) {
      setFinalRestaurant(restaurant);
    }
    setFinalFormData({
      ...formData,
      ...formValue,
    });

    if (currentStep === EStepKey.Step3) {
      const step3Value = Object.entries(formValue).map(([key, value]) => {
        if (typeof value === 'object') {
          return { id: key, ...value };
        }
      });
      setFinalFormData({
        ...formData,
        ...formValue,
        step3: step3Value,
      });
    }
  };

  const onFinish = () => {
    setOpenModal();
  };

  return (
    <div>
      <FormStep
        onFinish={onFinish}
        onStepChange={handleChangeStep}
        handleValidate={handleValidate}
        form={form}
        stepList={stepList}
      >
        <StepOne stepKey={EStepKey.Step1} />
        <StepTwo stepKey={EStepKey.Step2} />
        <StepThree stepKey={EStepKey.Step3} />
        <Summary stepKey={EStepKey.Step4} />
      </FormStep>
      <Modal title="Form Data" open={isOpenModal} onCancel={closeModal}>
        <Col>
          <Row>
            <Col style={{ minWidth: 100 }}>Meal : </Col>
            <Col>{formData.meal}</Col>
          </Row>
          <Row>
            <Col style={{ minWidth: 100 }}>No of people:</Col>
            <Col>{formData.peopleNumber}</Col>
          </Row>
          <Row>
            <Col style={{ minWidth: 100 }}>Restaurant: </Col>
            <Col>{formData.restaurant}</Col>
          </Row>
          <Row>
            <Row style={{ minWidth: 100 }}>Dishes:</Row>
            <Col>
              {formData.step3.map((item) => (
                <Row>
                  {item.dishes}-{item.servings}
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      </Modal>
    </div>
  );
};

export default CreateTodo;
