import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Search, PlusCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { getProducts } from "./data/products";
import { useQuery } from "@tanstack/react-query";

export function App() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Produtos</h1>

      <div className="flex items-center justify-between">
        <form className="flex items-center gap-2">
          <Input name="id" placeholder="ID do pedido" />
          <Input name="name" placeholder="Nome do produto" />

          <Button type="submit" variant="link">
            <Search className="w-4 h-4 mr-2" />
            Filtrar resultados
          </Button>
        </form>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo produto
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo produto</DialogTitle>
              <DialogDescription>Criar um novo produto no sistema</DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="name">Produto</Label>
                <Input className="col-span-3" id="name" />
              </div>

              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="price">Preço</Label>
                <Input className="col-span-3" id="price" />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
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