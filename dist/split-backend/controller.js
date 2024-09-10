import { createGroup as createGroupInDB } from "./db/queries/group.js";
import { createUser as createUserInDB, getAllUsersInGroup as getAllUsersInGroupFromDB, } from "./db/queries/user.js";
import { saveTransaction as saveTransactionInDB, savePayment as savePaymentInDB, savePayments as savePaymentsInDB, getAllTransactionInGroup as getAllTransactionInGroupFromDB, } from "./db/queries/transaction.js";
import { getGroup as getGroupInDB, getOverviewDataInGroup as getOverviewDataInGroupFromDb, } from "./db/queries/group.js";
import { encrypt, decrypt } from "./utils/crypto.js";
import { send_push_notification } from "./utils/send_notification.js";
const createGroup = async (req, res) => {
    try {
        const requiredFields = ["name"];
        if (!requiredFields.every((each) => Object.keys(req.body).includes(each))) {
            throw new Error(`Required Field missing ${requiredFields}`);
        }
        const response = await createGroupInDB(req.body);
        const inviteId = encrypt(`${response.id}`);
        return res.status(200).send({ ...response.dataValues, inviteId });
    }
    catch (error) {
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
    }
    catch (error) {
        console.error("error", error);
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
    }
    catch (error) {
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
        if (req.body.transactionParts.reduce((sum, e) => sum + e.amount, 0) !=
            req.body.totalAmount) {
            throw new Error(`distribution is not matching with totalAmount.`);
        }
        const response = await saveTransactionInDB(req.body);
        send_push_notification({
            groupName: req.body.groupName,
            headings: "New Expense",
            title: req.body.title,
        });
        return res.status(200).send(response);
    }
    catch (error) {
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
        send_push_notification({
            groupName: req.body.groupName,
            headings: "New Payment",
            title: `INR ${req.body.amount}`,
        });
        return res.status(200).send(response);
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
};
const savePayments = async (req, res) => {
    try {
        const requiredFields = ["from", "to", "amount"];
        for (let each of req.body) {
            if (!Object.prototype.hasOwnProperty.call(each, "from") ||
                !Object.prototype.hasOwnProperty.call(each, "to") ||
                !Object.prototype.hasOwnProperty.call(each, "amount")) {
                throw new Error(`Required Field missing ${requiredFields}`);
            }
        }
        const response = await savePaymentsInDB(req.body);
        req.body.forEach((e) => {
            send_push_notification({
                groupName: e.groupName,
                headings: "New Payment",
                title: `INR ${e.amount}`,
            });
        });
        return res.status(200).send(response);
    }
    catch (error) {
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
    }
    catch (error) {
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
    }
    catch (error) {
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
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
};
export { joinGroup, createGroup, createUser, saveTransaction, savePayment, getAllUsersInGroup, getAllTransactionInGroup, getOverviewDataInGroup, savePayments, };
