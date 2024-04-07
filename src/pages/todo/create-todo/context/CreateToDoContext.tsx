import { createContext, useContext, useState } from 'react';
import { IDishes, IListDishes } from '../CreateTodo.model';
import useUtils from '../../../../common/func/until';

interface ICreateTodoContext {
  selectedMeal: string;
  setSelectedMeal: (meal: string) => void;
  formData: ICreateTodo;
  setFinalFormData: (value: ICreateTodo) => void;
  availabelDishes: IDishes[];
  setFinalAvailabelDishes: (value: IDishes[]) => void;
  selectedRestaurant: string;
  setFinalRestaurant: (value: string) => void;
  fakeData: IDishes[];
  setFinalFakeData: (value: IDishes[]) => void;
}

interface ICreateTodo {
  meal: string;
  peopleNumber: number;
  restaurant: string;
  step3: IListDishes[];
}

const CreateTodoContext = createContext<ICreateTodoContext>({
  selectedMeal: '',
  formData: {
    meal: '',
    restaurant: '',
    peopleNumber: 0,
    step3: [],
  },
  availabelDishes: [],
  selectedRestaurant: '',
  fakeData: [],
  setSelectedMeal: () => 1,
  setFinalFormData: () => 1,
  setFinalAvailabelDishes: () => 1,
  setFinalRestaurant: () => 1,
  setFinalFakeData: () => 1,
});

interface IProps {
  children: React.ReactElement;
}
export const CreateTodoProvie = ({ children }: IProps) => {
  const [selectedMeal, setSelectedMeal] = useState<string>('');
  const [availabelDishes, setAvailabelDishes] = useState<IDishes[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [fakeData, setFakeData] = useState<IDishes[]>([]);
  const { uuidv4 } = useUtils();
  const [formData, setFormData] = useState<ICreateTodo>({
    meal: '',
    peopleNumber: 0,
    restaurant: '',
    step3: [
      {
        id: uuidv4(),
      },
    ],
  });
  const setFinalFormData = (value: ICreateTodo) => {
    setFormData(value);
  };

  const setFinalAvailabelDishes = (value: IDishes[]) => {
    setAvailabelDishes(value);
  };

  const setFinalFakeData = (value: IDishes[]) => {
    setFakeData(value);
  };

  const setFinalRestaurant = (value: string) => {
    setSelectedRestaurant(value);
  };
  return (
    <CreateTodoContext.Provider
      value={{
        selectedMeal,
        setSelectedMeal,
        setFinalFormData,
        formData,
        availabelDishes,
        setFinalAvailabelDishes,
        selectedRestaurant,
        setFinalRestaurant,
        fakeData,
        setFinalFakeData,
      }}
    >
      {children}
    </CreateTodoContext.Provider>
  );
};

export default CreateTodoContext;

export const useCreateTodo = () => useContext(CreateTodoContext);
