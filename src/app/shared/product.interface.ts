export interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  homepagePosition?: string;
  tags: string[];
  quantity:number;
  url?: string;
  img: any;
  key?: string;
}
