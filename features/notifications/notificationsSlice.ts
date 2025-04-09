import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

// Ethiopian names for the notifications
const ethiopianNames = [
  "Abebe Bikila",
  "Tewodros Kassahun",
  "Meseret Defar",
  "Haile Gebrselassie",
  "Tirunesh Dibaba",
  "Bekele Mamo",
  "Almaz Ayana",
  "Derartu Tulu",
  "Kenenisa Bekele",
  "Genzebe Dibaba",
]

// Zones for the notifications
const zones = ["Downtown", "Central Market", "Bole District", "Piazza", "Merkato", "Kazanchis", "Meskel Square"]

export interface Notification {
  id: string
  user: string
  zone: string
  time: string
  read: boolean
  timestamp: number
}

interface NotificationsState {
  items: Notification[]
  loading: boolean
  error: string | null
}

// Generate initial notifications
const generateNotifications = (count = 5): Notification[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: uuidv4(),
    user: ethiopianNames[Math.floor(Math.random() * ethiopianNames.length)],
    zone: zones[Math.floor(Math.random() * zones.length)],
    time: "1 hr",
    read: false,
    timestamp: Date.now() - i * 60000, // Decreasing timestamps for sorting
  }))
}

const initialState: NotificationsState = {
  items: generateNotifications(),
  loading: false,
  error: null,
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, "id" | "timestamp">>) => {
      state.items.unshift({
        ...action.payload,
        id: uuidv4(),
        timestamp: Date.now(),
      })
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((notification) => notification.id !== action.payload)
    },
    clearAllNotifications: (state) => {
      state.items = []
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find((n) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((notification) => {
        notification.read = true
      })
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    loadMoreNotifications: (state) => {
      // Simulate loading more notifications
      const newNotifications = generateNotifications(3).map((notification) => ({
        ...notification,
        timestamp:
          state.items.length > 0
            ? Math.min(...state.items.map((n) => n.timestamp)) - Math.floor(Math.random() * 3600000)
            : Date.now(),
      }))
      state.items = [...state.items, ...newNotifications]
    },
  },
})

export const {
  addNotification,
  deleteNotification,
  clearAllNotifications,
  markAsRead,
  markAllAsRead,
  setLoading,
  setError,
  loadMoreNotifications,
} = notificationsSlice.actions

export default notificationsSlice.reducer
