/* eslint-disable @typescript-eslint/no-unused-vars */
export async function getProducts() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { id: 290, name: 'Product 290', price: 17 },
    { id: 288, name: 'Product 288', price: 83 },
    { id: 296, name: 'Product 296', price: 84 },
    { id: 297, name: 'Product 297', price: 35 },
    { id: 293, name: 'Product 293', price: 98 },
    { id: 294, name: 'Product 294', price: 21 },
    { id: 285, name: 'Product 285', price: 62 },
    { id: 282, name: 'Product 282', price: 68 },
  ]
}

interface CreateProductRequest {
  name: string;
  price: number;
}

export async function createProduct(_: CreateProductRequest){
  await new Promise(resolve => setTimeout(resolve, 1000))

  return
}
