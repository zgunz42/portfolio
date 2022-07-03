import { createClient } from '@supabase/supabase-js'
import { SupabaseAnonKey, SupabaseProjectUrl } from 'constant'

const options = {
	schema: 'public',
	headers: { 'x-app-name': 'devbox-app' },
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true
}
const supabase = createClient(SupabaseProjectUrl, SupabaseAnonKey, options)

export default supabase
