import { createClient } from '@supabase/supabase-js'

const SUPABASE_HOST = import.meta.env.VITE_SUPABASE_HOST as string
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string

const SB = createClient(SUPABASE_HOST, SUPABASE_KEY)

export default SB
