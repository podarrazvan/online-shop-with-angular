export interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  homepagePosition?: string;
  tags: string[];
  quantity:number;
  img: any;
  key?: string;
}
