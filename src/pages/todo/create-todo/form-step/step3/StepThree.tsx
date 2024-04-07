import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, InputNumber, Row, Select } from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { IBaseFormStepProps } from '../../../../../common/form-step/FormStep.model';
import useUtils from '../../../../../common/func/until';
import { useCreateTodo } from '../../context/CreateToDoContext';
import { IListDishes } from '../../CreateTodo.model';

const StepThree = (props: IBaseFormStepProps) => {
  const { stepKey } = props;
  const { uuidv4 } = useUtils();
  const step3Form = useFormInstance();

  const [listDishes, setListDishes] = useState<IListDishes[]>([]);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const { selectedMeal, selectedRestaurant, fakeData, formData } = useCreateTodo();

  useEffect(() => {
    setListDishes(formData?.step3 ?? []);
  }, []);

  const handleCheckDuplicateDish = (option: string) => {
    const formValue = step3Form.getFieldsValue();
    const temp = Object.entries(formValue as Record<string, { dishes: string }>).map(
      ([_, value]) => {
        return value?.dishes;
      }
    );
    const arrayCheck = temp.filter((item) => item === option);
    const isValid = arrayCheck.length <= 1;
    return isValid;
  };

  const handleGetListDishesOption = () => {
    try {
      const dishesOptions = fakeData
        .filter(
          (item) =>
            item.availableMeals?.includes(selectedMeal) && item.restaurant === selectedRestaurant
        )
        .map((item) => {
          return {
            ...item,
            label: item.name,
            value: item.name,
          };
        });
      setOptions(dishesOptions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetListDishesOption();
  }, []);

  const handleDeleteDish = (id: string) => {
    const deteledList = listDishes.filter((item) => item.id !== id);
    setListDishes(deteledList);
  };
  return (
    <div>
      <Col>
        {listDishes.map((item) => (
          <Row key={item.id} gutter={24}>
            <Col lg={10}>
              <Form.Item
                name={[item.id, 'dishes']}
                label="Please Select a Dish"
                rules={[
                  {
                    validator: (_, value) => {
                      console.log(value);
                      if (!value) return Promise.reject(new Error('This field is required.'));
                      if (!handleCheckDuplicateDish(value)) {
                        return Promise.reject(new Error('duplicate dish'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Select
                  placeholder="Select a option"
                  options={options}
                  onSelect={() => {
                    step3Form.validateFields(['dishes']);
                  }}
                ></Select>
              </Form.Item>
            </Col>
            <Col lg={10}>
              <Form.Item
                name={[item.id, 'servings']}
                label="Please enter a no of servings"
                rules={[
                  {
                    required: true,
                    message: 'This is required',
                  },
                ]}
              >
                <InputNumber min={0} max={10} />
              </Form.Item>
            </Col>
            <Button type="text" onClick={() => handleDeleteDish(item.id)}>
              <DeleteOutlined />
            </Button>
          </Row>
        ))}

        <Button type="text" onClick={() => setListDishes([...listDishes, { id: uuidv4() }])}>
          <PlusCircleOutlined />
        </Button>
      </Col>
    </div>
  );
};

export default StepThree;
