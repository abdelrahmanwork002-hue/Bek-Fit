'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitPaymentReceipt(formData: FormData) {
  const supabase = await createClient()

  // 1. Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw new Error('Unauthorized')

  const amount = parseFloat(formData.get('amount') as string) || 299.00
  const receiptUrl = formData.get('receiptUrl') as string

  // 2. Create payment record
  const { error: paymentError } = await supabase
    .from('payments')
    .insert({
      user_id: user.id,
      amount,
      currency: 'EGP',
      status: 'pending',
      receipt_url: receiptUrl
    })

  if (paymentError) {
    console.error('Payment entry error:', paymentError)
    return { error: paymentError.message }
  }

  revalidatePath('/payment')
  return { success: 'Your receipt has been submitted for verification.' }
}
