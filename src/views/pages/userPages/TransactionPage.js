import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import transactionService from "../../../services/transaction.service";
import { useSelector } from "react-redux";

const TransactionPage = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // fetch("/api/transactions") // Replace with your actual API endpoint
    //   .then((res) => res.json())
    //   .then((data) => setTransactions(data.transactions));
    const getTransactions = async ()=>{
        const result = await transactionService.getUserTransaction(currentUser.id)
        console.log(result)
        setTransactions(result.transactions)
    }
    getTransactions()
  }, []);

  const filteredTransactions = transactions.filter((tx) =>
    tx.TransactionID.toString().includes(search.toLowerCase())
  );
  

  return (
    <div style={{ padding: "24px", height:'68vh' }}>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.TransactionID}>
                {/* <TableCell>{`${tx.Customer.Firstname} ${tx.Customer.Middlename}. ${tx.Customer.Lastname}`}</TableCell> */}
                  <TableCell>₱{tx.TotalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={tx.Status}
                      color={tx.status === "paid" ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell>{tx.PaymentMethod.toUpperCase()}</TableCell>
                  <TableCell>{new Date(tx.TransactionDate).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;
