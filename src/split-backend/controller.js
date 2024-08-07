import { createGroup as createGroupInDB } from "./db/queries/group.js";
import {
  createUser as createUserInDB,
  getAllUsersInGroup as getAllUsersInGroupFromDB,
} from "./db/queries/user.js";
import {
  saveTransaction as saveTransactionInDB,
  getAllTransactionInGroup as getAllTransactionInGroupFromDB,
} from "./db/queries/transaction.js";
import {
  getGroup as getGroupInDB,
  getGroupView as getGroupViewFromDB,
  getOverviewDataInGroup as getOverviewDataInGroupFromDb,
} from "./db/queries/group.js";

const createGroup = async (req, res) => {
  try {
    const requiredFields = ["name"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    const response = await createGroupInDB(req.body);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const getGroup = async (req, res) => {
  try {
    const requiredFields = ["group_id"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    const response = await getGroupInDB(req.body);
    if (response == null) {
      throw new Error("No Group Found");
    }
    return res.status(200).send(response);
  } catch (error) {
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
    const requiredFields = ["by", "totalAmount", "transaction_part"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    if (!req.body.transaction_part.every((e) => e.user_id && e.amount)) {
      throw new Error(`distribution should be array of {userId, amount}`);
    }

    if (
      req.body.transaction_part.reduce((sum, e) => sum + e.amount, 0) !=
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

const getGroupView = async (req, res) => {
  try {
    const requiredFields = ["group_id"];
    if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
      throw new Error(`Required Field missing ${requiredFields}`);
    }

    const response = await getGroupViewFromDB(req.body);
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
  getGroup,
  getGroupView,
  createGroup,
  createUser,
  saveTransaction,
  getAllUsersInGroup,
  getAllTransactionInGroup,
  getOverviewDataInGroup,
};
