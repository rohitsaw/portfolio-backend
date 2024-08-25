import { QueryTypes } from "sequelize";
import {
  sequelize,
  split_backend as schemaname,
} from "../../../../src/postgres.js";

const createGroup = async (payload) => {
  return sequelize.models.Group.create({ name: payload.name });
};

const getGroup = async ({ group_id }) => {
  return sequelize.models.Group.findOne({ where: { id: group_id }, raw: true });
};

const getOverviewDataInGroup = async ({ group_id }) => {
  const query = `select A.name, A.id as user_id, 
(coalesce(B.total_pos,0) - coalesce(C.total_neg,0)) as balances, 
coalesce(number_of_transactions, 0) as number_of_transactions, 
coalesce(number_of_payments,0) as number_of_payments,
coalesce(number_of_benefits,0) as number_of_benefits

from ${schemaname}.users A
left join 
(select by as user_id, sum(amount) as total_pos, 
count(case when category != 'payment' then by else null end) as number_of_transactions, 
count(case when category = 'payment' then by else null end) as number_of_payments 
from ${schemaname}.transactions
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

export { getGroup, createGroup, getOverviewDataInGroup };
