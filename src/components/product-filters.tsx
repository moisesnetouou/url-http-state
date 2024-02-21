import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productsFiltersSchema = z.object({
  id: z.string(),
  name: z.string()
})

type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>

export function ProductFilters(){
  const { register, handleSubmit } = useForm<ProductsFiltersSchema>({
    resolver: zodResolver(productsFiltersSchema)
  })

  function handleFilterProducts(data: ProductsFiltersSchema) {
    console.log(data)
  }

  return(
    <form onSubmit={handleSubmit(handleFilterProducts)} className="flex items-center gap-2">
      <Input placeholder="ID do pedido" {...register("id")} />
      <Input placeholder="Nome do produto" {...register("name")} />

      <Button type="submit" variant="link">
        <Search className="w-4 h-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  )
}