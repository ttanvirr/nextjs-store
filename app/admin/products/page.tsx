import EmptyList from "@/components/global/EmptyList"
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { formatCurrency } from "@/utils/format"
import { IconButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"

const AdminProductsPage = async () => {
  const products = await fetchAdminProducts()

  if (products.length === 0) return <EmptyList />

  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total products : {products.length}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price ($)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => {
            const { id: productId, name, company, price } = product
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    target="_blank"
                    className="underline text-muted-foreground hover:text-primary tracking-wide capitalize"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType="edit" buttonType="button" />
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}

const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, { productId })
  return (
    <FormContainer action={deleteProduct} refresh>
      <IconButton buttonType="submit" actionType="delete" />
    </FormContainer>
  )
}

export default AdminProductsPage
