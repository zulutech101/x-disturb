"use client";

import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

export interface Notification {
  id?: string;
  title: string;
  message: string;
  target: string;
  createdAt: Timestamp;
  status: "Sent";
}

const NOTIFICATIONS_COLLECTION = "notifications";

// Save a new notification
export const sendNotification = async ({
  title,
  message,
  target,
  targetType,
  scheduledAt,
  status,
}: {
  title: string;
  message: string;
  target: string;
  targetType: "all" | "category" | "referral";
  scheduledAt: Date | null;
  status: "Sent" | "Scheduled";
}) => {
  await addDoc(collection(db, "notifications"), {
    title,
    message,
    target,
    targetType,
    status,
    scheduledAt: scheduledAt ? Timestamp.fromDate(scheduledAt) : null,
    createdAt: Timestamp.now(),
  });
};


// Fetch history
export const fetchNotificationHistory = async (): Promise<Notification[]> => {
  const snap = await getDocs(collection(db, NOTIFICATIONS_COLLECTION));
  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      message: data.message,
      target: data.target,
      createdAt: data.createdAt,
      status: data.status,
    };
  });
};
