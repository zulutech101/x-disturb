"use client";

import { useEffect, useState } from "react";
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

// User interface (adjust fields based on your needs)
export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  role?: string;
}

// Function to fetch users
export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersQuery = query(collection(db, "users"));
    
    const unsubscribe = onSnapshot(
      usersQuery,
      (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        
        setUsers(usersData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching users:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return { users, loading, error };
};

// Function to update user status
export const updateUserStatus = async (userId: string, currentStatus: boolean) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      isActive: !currentStatus, // Toggles the current status
      updatedAt: new Date().toISOString() // Optional: track when status was updated
    });
    return { success: true, message: "User status updated successfully" };
  } catch (error) {
    console.error("Error updating user status:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update status" 
    };
  }
};