"use client"

import { useState } from "react"
import { MoreVertical, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks"
import {
  clearAllNotifications,
  deleteNotification,
  loadMoreNotifications,
  markAllAsRead,
  markAsRead,
} from "@/features/notifications/notificationsSlice"
import { formatDistanceToNow } from "date-fns"

export default function NotificationsPage() {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.notifications.items)
  const loading = useAppSelector((state) => state.notifications.loading)

  const [showClearAlert, setShowClearAlert] = useState(false)
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null)

  const handleClearAll = () => {
    dispatch(clearAllNotifications())
    setShowClearAlert(false)
  }

  const handleDeleteNotification = (id: string) => {
    dispatch(deleteNotification(id))
    setNotificationToDelete(null)
  }

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead())
  }

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id))
  }

  const handleLoadMore = () => {
    dispatch(loadMoreNotifications())
  }

  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: false })
  }

  return (
    <div className="max-w-7xl">
      <div className="flex items-center gap-4 mb-6">
       
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">All Notifications</h2>
          <div className="flex gap-2">
            {notifications.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-sm hover:text-[#E66641] hover:bg-[#FDE8E4]"
                >
                  Mark all as read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowClearAlert(true)}
                  className="text-sm text-[#E66641] hover:text-[#C4502F] hover:bg-[#FDE8E4]"
                >
                  Clear notification history
                </Button>
              </>
            )}
          </div>
        </div>

        <div>
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <p className="mb-4">No notifications</p>
              <Link href="/dashboard">
                <Button className="bg-[#E66641] hover:bg-[#C4502F]">Return to Dashboard</Button>
              </Link>
            </div>
          ) : (
            <>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 border-b border-gray-300 hover:bg-[#FDE8E4] transition-colors ${
                    !notification.read ? "bg-[#fff5f3]" : ""
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={notification.user} />
                    <AvatarFallback className="bg-[#E66641] text-white">
                      {notification.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">User: {notification.user}</p>
                    <p className="text-sm text-muted-foreground">Entered Zone: {notification.zone}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatTime(notification.timestamp)}
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted/50 transition">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white" align="end">
                        <DropdownMenuItem
                          onClick={() => setNotificationToDelete(notification.id)}
                          className="text-[#E66641] focus:text-[#E66641] focus:bg-[#FDE8E4]"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                        {!notification.read && (
                          <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                            <X className="mr-2 h-4 w-4" />
                            Mark as read
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              <div className="p-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  className="text-[#E66641] hover:text-[#C4502F] hover:bg-[#FDE8E4] border-[#E66641]"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load more notifications"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Clear All Notifications Alert */}
      <AlertDialog open={showClearAlert} onOpenChange={setShowClearAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All notifications will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll} className="bg-[#E66641] hover:bg-[#C4502F] text-white">
              Clear all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Single Notification Alert */}
      <AlertDialog open={notificationToDelete !== null} onOpenChange={(open) => !open && setNotificationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete notification?</AlertDialogTitle>
            <AlertDialogDescription>This notification will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => notificationToDelete && handleDeleteNotification(notificationToDelete)}
              className="bg-[#E66641] hover:bg-[#C4502F] text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
