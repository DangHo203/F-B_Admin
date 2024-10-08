export interface IFormEditProps {
    setIsEdit: (value: boolean) => void;
    m_id: string;
}
export interface IIngredients {
    name?: string;
    item_id?: number;
    quantity_required?: number;
    ingredient_id: number;
}

export interface INutrition {
    nutritional_info_id: number;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}

export interface IMenu {
    title: string;
    price: string;
    category?: string;
    description: string;
    image: string;
}

export interface IFoodDetail {
    food: IMenu;
    nutrition: INutrition;
    ingredients: IIngredients[];
}
