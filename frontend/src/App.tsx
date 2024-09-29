import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { Customer, PriceHistory, Pricing, Product } from "./types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { toLocaleDateTime } from "./utils";

function App() {
  const API_HOST = "http://127.0.0.1:5000/api";
  const [customers, setCusomters] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | null | undefined
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<
    Product | null | undefined
  >(null);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [history, setHistory] = useState<PriceHistory[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch(`${API_HOST}/v1/customers`);
        const data = await response.json();
        const customers = data.data;
        setCusomters(customers);
      } catch (e) {
        console.error(e);
      }
    }

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      async function fetchCustomerPricing() {
        try {
          const response = await fetch(
            `${API_HOST}/v1/price?customer_id=${selectedCustomer?.customer_id}`
          );
          const data = await response.json();
          const pricing = data.data;
          setPricing(pricing);
        } catch (e) {
          console.error(e);
        }
      }

      fetchCustomerPricing();
    }
  }, [selectedCustomer]);

  const onClickCustomer = (id: string) => {
    const customer = customers.find((customer) => customer.customer_id === id);
    setSelectedCustomer(customer);
    setSelectedProduct(null);
    setHistory([]);
  };

  const selectProductFromPricing = (pricing_id: string) => {
    const product = pricing.find(
      (price) => price.pricing_id === pricing_id
    )?.product;
    setSelectedProduct(product);
  };

  const handleViewHistory = async (pricing_id: string) => {
    selectProductFromPricing(pricing_id);
    try {
      const response = await fetch(
        `${API_HOST}/v1/price-history/${pricing_id}`
      );
      const data = await response.json();
      const history = data.data;
      setHistory(history);
    } catch (e) {
      console.error(e);
    }
  };

  const labels = useMemo(() => {
    if (history.length === 0) return [];

    const currency = pricing.find(
      (price) => price.pricing_id === history[0].pricing_id
    )?.customer.currency;
    return history.map((item) =>
      toLocaleDateTime(item.update_timestamp, String(currency))
    );
  }, [history]);

  const data = useMemo(() => {
    return history.map((item) => item.updated_price);
  }, [history]);

  return (
    <>
      <h1 className="text-3xl font-bold">Pricing Management System</h1>

      <div className="flex flex-row justify-center my-5">
        <Select onValueChange={onClickCustomer}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {customers.map((customer) => (
                <SelectItem
                  key={customer.customer_id}
                  value={customer.customer_id}
                  onClick={() => console.log("click")}
                >
                  {customer.customer_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row justify-center my-5 text-left">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price (Currency)</TableHead>
              <TableHead>Effective Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricing.map((price) => (
              <TableRow key={price.pricing_id}>
                <TableCell>{price.product.product_name}</TableCell>
                <TableCell>
                  {price.price} ({price.customer.currency})
                </TableCell>
                <TableCell>{price.effective_date.toString()}</TableCell>
                <TableCaption>
                  <Button
                    variant="outline"
                    onClick={() => handleViewHistory(price.pricing_id)}
                  >
                    See History
                  </Button>
                </TableCaption>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {history.length > 0 ? (
        <div className="flex flex-row justify-center my-5 text-left">
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: `Price history for ${selectedProduct?.product_name}`,
                  data: data,
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
