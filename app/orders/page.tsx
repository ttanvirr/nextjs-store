import SectionTitle from "@/components/global/SectionTitle"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchUserOrders } from "@/utils/actions"
import { formatCurrency, formatDate } from "@/utils/format"

const OrdersPage = async () => {
  // console.log("SEARCHPARAM", status)

  const orders = await fetchUserOrders()

  if (orders.length === 0)
    return <SectionTitle text="You have no orders yet." />

  return (
    <>
      <SectionTitle text="Your orders" />

      <Table>
        <TableCaption>Total orders: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => {
            const { id, productsCount, orderTotal, tax, shipping, createdAt } =
              order
            return (
              <TableRow key={id}>
                <TableCell>{productsCount}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default OrdersPage
