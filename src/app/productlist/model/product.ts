import { ICategory } from './category';

export interface IProduct {
    id: number,
    title: string,
    description: string,
    sku: string,
    categories: Array<ICategory>
}