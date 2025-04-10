import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/app/firebase/config";

type Payments = {
  id: string;
  amount: number;
  createdAt: string;
  currency: string;
  customerId: string;
  customerName: string;
  invoiceId: string;
  orderId: string;
  paymentMethods: string;
  providerId: string;
  refundStatus: string | null;
  status: string;
  transactionId: string;
};

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<Payments[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "payments"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          amount: d.amount,
          createdAt: d.createdAt?.toDate().toLocaleString(),
          currency: d.currency,
          customerId: d.customerId,
          customerName: d.customerName,
          invoiceId: d.invoiceId,
          orderId: d.orderId,
          paymentMethods: d.paymentMethods,
          providerId: d.providerId,
          refundStatus: d.refundStatus,
          status: d.status,
          transactionId: d.transactionId,
        };
      });

      setTransactions(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { transactions, loading };
};
