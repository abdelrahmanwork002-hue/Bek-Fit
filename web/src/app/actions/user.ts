'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient()

  // 1. Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw new Error('Unauthorized')

  const fullName = formData.get('fullName') as string
  const goalId = formData.get('goalId') as string
  const age = formData.get('age') as string

  // 2. Update users table
  const { error: profileError } = await supabase
    .from('users')
    .update({ 
      full_name: fullName, 
      goal_id: goalId === 'none' ? null : goalId,
      profile_data: {
        ...( (await supabase.from('users').select('profile_data').eq('id', user.id).single()).data?.profile_data as object || {} ),
        age: parseInt(age) || null
      }
    })
    .eq('id', user.id)

  if (profileError) {
    console.error('Update profile error:', profileError)
    return { error: profileError.message }
  }

  revalidatePath('/profile')
  return { success: 'Profile updated successfully!' }
}
