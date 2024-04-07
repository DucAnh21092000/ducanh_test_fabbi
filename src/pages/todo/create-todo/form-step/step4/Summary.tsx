import { Col, Row } from 'antd';
import { IBaseFormStepProps } from '../../../../../common/form-step/FormStep.model';
import { useCreateTodo } from '../../context/CreateToDoContext';

const Summary = (props: IBaseFormStepProps) => {
  const { stepKey } = props;
  const { formData } = useCreateTodo();

  return (
    <div key={stepKey}>
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
    </div>
  );
};

export default Summary;
