/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/data/products";


const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number()
})

type CreateProductSchema = z.infer<typeof createProductSchema>

interface Product {
  id: string;
  name: string;
  price: number;
}

type SetProductsData = (prevProducts: Product[] | undefined, variables: { name: string; price: number }) => Product[];

export function CreateProductDialog(){
  const queryClient = useQueryClient()

  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(_, variables) {

      const cached: Product[] | undefined = queryClient.getQueryData<Product[]>(["products"]);
  
      console.log(cached);
  
      const setProductsData: SetProductsData = (prevProducts) => {
        if (!prevProducts) return [];
  
        return [...prevProducts, {
          id: crypto.randomUUID(),
          name: variables.name,
          price: variables.price
        }];
      };
  
      queryClient.setQueryData(["products"], setProductsData);
    }
  });

  async function handleCreateProduct(data: CreateProductSchema){
    try {
      await createProductFn({
        name: data.name,
        price: data.price
      })

      alert("Produto cadastrado com sucesso!")
    } catch (err) {
      alert("Erro ao cadastrar produto")
    }
  }

  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo produto</DialogTitle>
        <DialogDescription>Criar um novo produto no sistema</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="name">Produto</Label>
          <Input className="col-span-3" {...register("name")} />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="price">Preço</Label>
          <Input className="col-span-3" {...register("price")} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}