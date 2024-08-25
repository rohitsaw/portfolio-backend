import { createGroup as createGroupInDB } from "./db/queries/group.js";
import {
  createUser as createUserInDB,
  getAllUsersInGroup as getAllUsersInGroupFromDB,
} from "./db/queries/user.js";
import {
  saveTransaction as saveTransactionInDB,
  savePayment as savePaymentInDB,
  savePayments as savePaymentsInDB,
  getAllTransactionInGroup as getAllTransactionInGroupFromDB,
} from "./db/queries/transaction.js";
import {
  getGroup as getGroupInDB,
  getOverviewDataInGroup as getOverviewDataInGroupFromDb,
} from "./db/queries/group.js";

import { encrypt, decrypt } from "./utils/crypto.js";

const createGroup = async (req, res) => {
  try {
    const requiredFields = ["name"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    const response = await createGroupInDB(req.body);
    const inviteId = encrypt(`${response.id}`);
    return res.status(200).send({ ...response.dataValues, inviteId });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const joinGroup = async (req, res) => {
  try {
    const requiredFields = ["invite_id"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    const group_id = decrypt(req.body.invite_id);

    const response = await getGroupInDB({ group_id: group_id });

    if (response == null) {
      throw new Error("No Group Found");
    }

    const inviteId = encrypt(`${response.id}`);

    return res.status(200).send({ ...response, inviteId });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const requiredFields = ["name", "group_id"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    const response = await createUserInDB(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
const saveTransaction = async (req, res) => {
  try {
    const requiredFields = ["by", "title", "totalAmount", "transactionParts"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    if (!req.body.transactionParts.every((e) => e.user_id && e.amount)) {
      throw new Error(`distribution should be array of {userId, amount}`);
    }

    if (
      req.body.transactionParts.reduce((sum, e) => sum + e.amount, 0) !=
      req.body.totalAmount
    ) {
      throw new Error(`distribution is not matching with totalAmount.`);
    }

    const response = await saveTransactionInDB(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const savePayment = async (req, res) => {
  try {
    const requiredFields = ["from", "to", "amount"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }
    const response = await savePaymentInDB(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const savePayments = async (req, res) => {
  try {
    const requiredFields = ["from", "to", "amount"];
    if (
      !req.body.every(
        (each) => Object.keys(each).sort() == requiredFields.sort()
      )
    ) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }
    const response = await savePaymentsInDB(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const getAllUsersInGroup = async (req, res) => {
  try {
    const requiredFields = ["group_id"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }
    const response = await getAllUsersInGroupFromDB(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const getAllTransactionInGroup = async (req, res) => {
  try {
    const requiredFields = ["group_id"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }
    const response = await getAllTransactionInGroupFromDB(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const getOverviewDataInGroup = async (req, res) => {
  try {
    const requiredFields = ["group_id"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }
    const response = await getOverviewDataInGroupFromDb(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export {
  joinGroup,
  createGroup,
  createUser,
  saveTransaction,
  savePayment,
  getAllUsersInGroup,
  getAllTransactionInGroup,
  getOverviewDataInGroup,
  savePayments,
};
