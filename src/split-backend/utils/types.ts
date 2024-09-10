interface createGroupPayload {
  name: string;
}

interface joinGroupPayload {
  invite_id: string;
}

interface createUserPayload {
  group_id: number;
  name: string;
}

interface saveTransactionPayload {
  groupName: string;
  totalAmount: number;
  title: string;
  by: number;
  transactionParts: Array<{ user_id: number; amount: number }>;
}

interface savePaymentPayload {
  groupName: string;
  amount: number;
  from: number;
  to: number;
}

interface getAllTransactionInGroupPayload {
  group_id: number;
  by?: number | string;
  user_id?: number | string;
  payments?: string;
}

export {
  createGroupPayload,
  joinGroupPayload,
  createUserPayload,
  saveTransactionPayload,
  savePaymentPayload,
  getAllTransactionInGroupPayload,
};
