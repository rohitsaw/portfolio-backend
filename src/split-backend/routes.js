import {
  getGroup,
  createGroup,
  createUser,
  saveTransaction,
  savePayment,
  getAllUsersInGroup,
  getAllTransactionInGroup,
  getOverviewDataInGroup,
} from "./controller.js";

const addRoutes = (app) => {
  app.post("/createGroup", createGroup);

  app.post("/getGroup", getGroup);

  app.post("/createUser", createUser);

  app.post("/saveTransaction", saveTransaction);

  app.post("/savePayment", savePayment);

  app.post("/getAllUsersInGroup", getAllUsersInGroup);

  app.post("/getOverviewDataInGroup", getOverviewDataInGroup);

  // AllExpenses, ExpensesInvolevedAUser, ExpensesByAUser
  app.post("/getAllExpensesInGroup", getAllTransactionInGroup);
};

export { addRoutes };
