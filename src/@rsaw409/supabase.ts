import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
  throw new Error(`SUPABASE_URL env variable not set`);
}

if (!process.env.SUPABASE_KEY) {
  throw new Error(`SUPABASE_KEY env variable not set`);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;
