export type Screen = 'dashboard' | 'search' | 'scenes' | 'people' | 'reviews' | 'settings' | 'drive'
export type DriveStatus = 'connected' | 'disconnected' | 'indexing' | 'pending'

export interface Drive {
  id: string
  label: string
  path: string
  serial: string
  status: DriveStatus
  keyframes: number
  videos: number
  lastIndexed: string
  progress?: number
}

export interface MediaResult {
  id: string
  image: string
  video: string
  drive: string
  timestamp: string
  score: number
  verified: boolean
  offline?: boolean
  tags: string[]
}

export interface ReviewItem {
  id: string
  name: string
  image: string
  reference: string
  confidence: number
  source: string
  timestamp: string
}
