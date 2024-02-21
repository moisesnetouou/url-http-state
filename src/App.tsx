import { Button } from "./components/ui/button";
import { PlusCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { getProducts } from "./data/products";
import { useQuery } from "@tanstack/react-query";
import { ProductFilters } from "./components/product-filters";
import { CreateProductDialog } from "./components/create-product-dialog";

export function App() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Produtos</h1>

      <div className="flex items-center justify-between">
        <ProductFilters />

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo produto
            </Button>
          </DialogTrigger>

          <CreateProductDialog />
        </Dialog>
      </div>

      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableHead>ID</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Preço</TableHead>
          </TableHeader>

          <TableBody>
            {products?.map((product) => {
              return(
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL"})}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}