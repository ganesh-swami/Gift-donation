import "server-only"

// Seam for email (e.g. Resend) later. v1 shares the invite link manually.
export async function notifyInviteCreated(_args: {
  recipientEmail: string
  recipientName: string
  inviteUrl: string
}) {}
