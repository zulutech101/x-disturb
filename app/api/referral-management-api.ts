"use client";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

export interface ReferralCode {
  id: string;
  name: string;
  description: string;
  createdAt?: Timestamp;
}

const REFERRAL_CODES_COLLECTION = "referral_codes";

export const fetchReferralCodes = async (): Promise<ReferralCode[]> => {
  const snap = await getDocs(collection(db, REFERRAL_CODES_COLLECTION));
  return snap.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
    };
  });
};

export const addReferralCode = async (
  name: string,
  description: string
): Promise<{ success: boolean; id: string }> => {
  const ref = await addDoc(collection(db, REFERRAL_CODES_COLLECTION), {
    name,
    description,
    createdAt: Timestamp.now(),
  });
  return { success: true, id: ref.id };
};

export const updateReferralCode = async (
  id: string,
  updates: { name: string; description: string }
): Promise<{ success: boolean }> => {
  await updateDoc(doc(db, REFERRAL_CODES_COLLECTION, id), updates);
  return { success: true };
};

export const deleteReferralCode = async (
  id: string
): Promise<{ success: boolean }> => {
  await deleteDoc(doc(db, REFERRAL_CODES_COLLECTION, id));
  return { success: true };
};
