import type { Drive, MediaResult, ReviewItem } from './types'

const photo = (id: string, w = 900) => `/assets/${id}.jpg`

export const drives: Drive[] = [
  { id: 'north', label: 'Archive North', path: '/Volumes/ARCHIVE_NORTH', serial: 'FF-A7C2-91D4', status: 'connected', keyframes: 18432, videos: 642, lastIndexed: '2026-08-21T08:42:00Z' },
  { id: 'field', label: 'Field Unit 03', path: '/Volumes/FIELD_03', serial: 'FF-B81E-47AC', status: 'indexing', keyframes: 9271, videos: 318, lastIndexed: '2026-08-21T06:18:00Z', progress: 68 },
  { id: 'doc', label: 'Documentary Masters', path: '/Volumes/DOC_MASTERS', serial: 'FF-2F96-C034', status: 'connected', keyframes: 32605, videos: 1084, lastIndexed: '2026-08-19T17:03:00Z' },
  { id: 'cold', label: 'Cold Storage 2024', path: '/Volumes/COLD_2024', serial: 'FF-704B-2E19', status: 'disconnected', keyframes: 12447, videos: 409, lastIndexed: '2026-08-06T11:27:00Z' },
]

export const results: MediaResult[] = [
  { id: 'r1', image: photo('dunes'), video: 'A_CAM_DESERT_014.mov', drive: 'Archive North', timestamp: '01:12:08:14', score: 94, verified: true, tags: ['golden hour', 'wide'] },
  { id: 'r2', image: photo('forest'), video: 'FOREST_UNIT_B_072.mxf', drive: 'Field Unit 03', timestamp: '00:04:37:19', score: 91, verified: true, tags: ['daylight', 'handheld'] },
  { id: 'r3', image: photo('night'), video: 'CITY_NIGHT_EXT_008.braw', drive: 'Documentary Masters', timestamp: '00:28:41:03', score: 87, verified: false, tags: ['night', 'wide'] },
  { id: 'r4', image: photo('snow'), video: 'MOUNTAIN_DRONE_103.r3d', drive: 'Cold Storage 2024', timestamp: '00:00:19:22', score: 84, verified: true, offline: true, tags: ['aerial', 'snow'] },
  { id: 'r5', image: photo('coast'), video: 'LAKE_DAWN_PICKUPS_022.mov', drive: 'Archive North', timestamp: '00:17:52:11', score: 82, verified: false, tags: ['daylight', 'water'] },
  { id: 'r6', image: photo('city'), video: 'ROOFTOP_ESTABLISHER_19.mxf', drive: 'Documentary Masters', timestamp: '00:09:33:07', score: 79, verified: true, tags: ['city', 'wide'] },
]

export const reviews: ReviewItem[] = [
  { id: 'f1', name: 'Maya Hassan', image: photo('maya', 500), reference: photo('maya', 500), confidence: 86, source: 'INTERVIEW_A_042.mov', timestamp: '00:13:08:21' },
  { id: 'f2', name: 'Omar Saleh', image: photo('omar', 500), reference: photo('omar', 500), confidence: 74, source: 'BTS_DAY_06.mxf', timestamp: '00:08:52:02' },
  { id: 'f3', name: 'Leila Nassar', image: photo('leila', 500), reference: photo('leila', 500), confidence: 68, source: 'MARKET_WALK_014.braw', timestamp: '00:22:11:16' },
  { id: 'f4', name: 'Unknown #48', image: photo('maya', 500), reference: photo('leila', 500), confidence: 61, source: 'EVENT_WIDE_008.mov', timestamp: '00:03:27:12' },
]
