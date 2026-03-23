import type { Product } from '../types'

export function getProducts(): Promise<Product[]>
export function getProductById(id: number): Promise<Product>
