import { type FunctionalComponent, type SVGAttributes } from 'vue';

export interface DraggableItem {
  id: string;
  icon: FunctionalComponent<SVGAttributes>;
  title: string;
  order: number;
}
