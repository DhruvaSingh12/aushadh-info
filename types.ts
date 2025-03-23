export interface Medicine{
    id: number;
    name: string | null;
    price: string | null;
    is_discontinued: string | null;
    manufacturer_name: string | null;
    type: string | null;
    pack_size_label: string | null;
    chemical_class: string | null;
    habit_forming: string | null;
    therapeutic_class: string | null;
    action_class: string | null;
    side_effect: string[] | null;
    substitute: string[] | null;
    use: string | null;
    short_composition: string[] | null;
}

export interface Therapeutic {
    id: number; 
    therapeutic_class: string | null; 
    frequency: number | null; 
    description: string | null; 
  }
  