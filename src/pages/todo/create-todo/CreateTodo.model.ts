export interface IDishes {
  id?: number;
  name?: string;
  restaurant?: string;
  availableMeals?: string[];
}

export interface IListDishes {
  id: string;
  dishes?: string;
  servings?: number;
}
