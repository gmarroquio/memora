"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { addMonths, isBefore } from "date-fns";

// Define the transaction type
type Transaction = {
  id: number;
  name: string;
  buyDate: string;
  expirationTime: number;
};

export default function PaymentHistory({
  payments,
}: {
  payments: Transaction[];
}) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (payment: Transaction) => {
    const active = isBefore(
      new Date(),
      addMonths(payment.buyDate, payment.expirationTime)
    );

    if (active) return <Badge variant="success">Ativo</Badge>;

    return <Badge variant="destructive">Expirado</Badge>;
  };

  return (
    <>
      {payments.length > 0 ? (
        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plano</TableHead>
                  <TableHead>Compra</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.name}
                    </TableCell>
                    <TableCell>{formatDate(transaction.buyDate)}</TableCell>
                    <TableCell>{getStatusBadge(transaction)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Sem histórico de pagamentos
          </h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Você ainda não fez nenhum pagamento. Assine um plano para ver seu
            histórico de pagamentos aqui.
          </p>
          <Button variant="outline">Ver Planos de Assinatura</Button>
        </div>
      )}
    </>
  );
}
