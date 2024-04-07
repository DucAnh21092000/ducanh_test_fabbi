import { Form } from 'antd';
import Select, { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { IBaseFormStepProps } from '../../../../../common/form-step/FormStep.model';
import { IDishes } from '../../CreateTodo.model';
import { useCreateTodo } from '../../context/CreateToDoContext';

const StepTwo = (props: IBaseFormStepProps) => {
  const { stepKey } = props;
  const { selectedMeal, setFinalFakeData } = useCreateTodo();
  const [restaurantOptions, setRestaurantOptions] = useState<DefaultOptionType[]>([]);

  const handleGetFakeData = async () => {
    try {
      // should show loading
      // call api
      await fetch('../../../../data/dishes.json')
        .then((rs) => rs.json())
        .then((data) => {
          const dishes: IDishes[] = data?.dishes ?? [];
          setFinalFakeData(dishes);
          const availabelRestaurant = dishes.filter((item) => {
            return item?.availableMeals?.includes(selectedMeal);
          });

          // remove duplicate restaurant

          // Case 1: use available function Es6 js
          const removedDuplicate = availabelRestaurant.reduce((pre: IDishes[], curr: IDishes) => {
            if (!pre) {
              return [curr];
            } else {
              const duplicateItem = pre.find(
                (item: IDishes) => item?.restaurant === curr.restaurant
              );
              if (!duplicateItem) {
                return [...pre, curr];
              }
              return [...pre];
            }
          }, []);
          const finalResult = removedDuplicate.map((item) => {
            return {
              ...item,
              label: item.restaurant,
              value: item.restaurant,
            };
          });

          // Case 2
          //const temp: { [key: string]: string } = {};
          // for (const item of availabelRestaurant) {
          //   if (Object.prototype.hasOwnProperty.call(temp, item?.restaurant ?? '')) {
          //     temp;
          //   } else {
          //     temp[item.restaurant ?? ''] = item?.restaurant ?? '';
          //   }
          // }
          // const finalResult = Object.entries(temp).map(([key, value]) => {
          //   return {
          //     label: key,
          //     value: key,
          //   };
          // });
          setRestaurantOptions(finalResult);
        });

      //show close loading
    } catch (e) {
      // should show handle error here
      console.log(e);
      // close loading
    }
  };

  useEffect(() => {
    handleGetFakeData();
  }, []);

  return (
    <div key={stepKey}>
      <Form.Item
        name="restaurant"
        label="Please Select a Restaurant"
        required
        rules={[{ required: true, message: 'This filed is required.' }]}
      >
        <Select options={restaurantOptions} placeholder="Select an option" />
      </Form.Item>
    </div>
  );
};

export default StepTwo;
