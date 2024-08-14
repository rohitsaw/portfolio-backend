import {
  sequelize,
  split_backend as schemaname,
} from "../../../../src/postgres.js";
import { QueryTypes } from "sequelize";

// example transaction payload
// const transaction = {
//   by: 1,
//   title : "expense",
//   totalAmount: 500,
//   transactionParts: [
//     {
//       user_id: 1,
//       amount: 100,
//     },
//     {
//       user_id: 5,
//       amount: 100,
//     },
//     {
//       user_id: 3,
//       amount: 300,
//     },
//   ],
// };

const saveTransaction = async (payload) => {
  try {
    return sequelize.transaction(async (t) => {
      const transaction = await sequelize.models.Transaction.create(
        {
          by: payload.by,
          title: payload.title,
          amount: payload.totalAmount,
        },
        { transaction: t }
      );

      const transaction_parts = payload.transactionParts.map((e) => {
        return {
          ...e,
          transaction_id: transaction.dataValues.id,
        };
      });

      const response = await sequelize.models.TransactionPart.bulkCreate(
        transaction_parts,
        { transaction: t }
      );

      return transaction;
    });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const getAllTransactionInGroup = async ({ group_id, by, user_id }) => {
  if (!by || by == "null") {
    by = undefined;
  }
  if (!user_id || user_id == "null") {
    user_id = undefined;
  }

  const query =
    (user_id ? `select * from( ` : ` `) +
    `select group_id, group_name, user_id, user_name, transaction_id, transaction_title, transaction_amount, transaction_date,
  jsonb_agg(jsonb_build_object('user_name' , distribution_name, 'user_id' , distribution_user_id, 'amount', distrubution_amount)) as distributions
  from (
  select 
  E.id as group_id, E.name as group_name,
  D.id as user_id, D.name as user_name,
  B.id as transaction_id, B.title as transaction_title, B.amount as transaction_amount, B.created_at as transaction_date,
  A.amount as distrubution_amount,
  A.user_id as distribution_user_id,
  C.name as distribution_name from
    
  ${schemaname}.transaction_parts A 
  join ${schemaname}.transactions B 
  on A.transaction_id = B.id
  
  join ${schemaname}.users C
  on A.user_id = C.id
  
  join ${schemaname}.users D
  on B.by = D.id
  
  join ${schemaname}.groups E
  on C.group_id = E.id
  
  where E.id = :group_id` +
    (by ? ` and B.by = :by` : ` `) +
    `) F
  group by 1,2,3,4,5,6,7,8` +
    (user_id
      ? `) G where 
    EXISTS (
      SELECT 1
      FROM jsonb_array_elements(distributions) elem
      WHERE elem->>'user_id' = :user_id
  )`
      : ` `) +
    ` order by transaction_date desc `;
  return sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { group_id: group_id, by: by, user_id: `${user_id}` },
  });
};

export { saveTransaction, getAllTransactionInGroup };
