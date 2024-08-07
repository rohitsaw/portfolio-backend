import { QueryTypes } from "sequelize";
import { sequelize } from "../../../../src/postgres.js";

const schemaname = "split_backend";

const createGroup = async (payload) => {
  return sequelize.models.Group.create({ name: payload.name });
};

const getGroup = async ({ group_id }) => {
  return sequelize.models.Group.findOne({ where: { id: group_id } });
};

const getGroupView = async ({ group_id }) => {
  return sequelize.query(
    `select group_id, group_name, 
coalesce(jsonb_agg(json_build_object('user_id',"user_id", 'user_name', "user_name", 'transactions', "transactions")) FILTER (WHERE user_id IS NOT NULL), '[]') as users from
(select group_id, group_name, user_id, user_name, 
coalesce(jsonb_agg(jsonb_build_object('transaction_id', "transaction_id", 'transaction_title', "transaction_title", 'transaction_amount', "transaction_amount", 'transaction_date', "transaction_date", 'distributions' , "distributions")) FILTER (WHERE transaction_id IS NOT NULL) , '[]') as "transactions" from
(select group_id, group_name, user_id, user_name, transaction_id, transaction_title, transaction_amount, transaction_date,
COALESCE(jsonb_agg(jsonb_build_object('user_id', "for", 'name', name, 'amount' , "partOfAmount")) FILTER (WHERE "for" IS NOT NULL) , '[]') as "distributions"
from (select 
A.id as group_id, A.name as group_name, 
B.id as user_id, B.name as user_name,
C.id as transaction_id, C.title as transaction_title, C.amount as transaction_amount, C.created_at as transaction_date,
D.user_id as "for", E.name, D.amount as "partOfAmount"
from ${schemaname}.groups A
join ${schemaname}.users B on A.id = B.group_id
left join ${schemaname}.transactions C on B.id = C.by
left join ${schemaname}.transaction_parts D on C.id = D.transaction_id
left join ${schemaname}.users E on D.user_id = E.id
where A.id = :group_id)
group by 1,2,3,4,5,6,7,8)
group by 1,2,3,4)
group by 1,2`,
    {
      type: QueryTypes.SELECT,
      replacements: { group_id: group_id },
    }
  );
};

const getOverviewDataInGroup = async ({ group_id }) => {
  const query = `
select A.name, A.id as user_id, 
(coalesce(B.total_pos,0) - coalesce(C.total_neg,0)) as balances, 
coalesce(number_of_transactions, 0) as number_of_transactions, 
coalesce(number_of_benefits,0) as number_of_benefits
from ${schemaname}.users A
left join 
(select by as user_id, sum(amount) as total_pos, count(*) as number_of_transactions from ${schemaname}.transactions
group by user_id) B
on A.id = B.user_id
left join
(select user_id, sum(amount) as total_neg, count(*) as number_of_benefits from ${schemaname}.transaction_parts
group by user_id) C
on A.id = C.user_id
where A.group_id = :group_id`;
  return sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { group_id: group_id },
  });
};

export { getGroup, createGroup, getGroupView, getOverviewDataInGroup };
