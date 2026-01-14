import { z } from 'zod'

export const eventSchema = z.object({
  projectId: z.uuid({ message: 'Invalid project ID format (UUID expected)' }),
  eventId: z.uuid({ message: 'Invalid event ID format (UUID expected)' }).optional(),
  eventName: z.string().min(1, { message: 'Event name is required' }),
  timestamp: z.number().describe('Unix timestamp'),
  clientId: z.string().min(1, { message: 'Client ID is required' }),
  sessionId: z.string().min(1, { message: 'Session ID is required' }),
  path: z.string().optional(),
  referrer: z.string().optional(),
  params: z.record(z.string(), z.any()).optional().describe('Custom key-value pairs'),
  sdkName: z.string().optional(),
  sdkVersion: z.string().optional(),
})

export type Event = z.infer<typeof eventSchema>
