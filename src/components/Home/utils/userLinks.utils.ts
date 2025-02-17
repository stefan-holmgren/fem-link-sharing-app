import { User } from "@/components/AuthContext/AuthContext";
import { db } from "@/config/firebase";
import { collection, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";

export type UserLink = {
  platform: "github" | "youtube";
  url: string;
};

export type UserLinks = {
  uid: string;
  links: UserLink[];
};

const UserLinkConverter = {
  toFirestore: (data: UserLinks) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as UserLinks,
};

export const getUserLinks = async (user: User) => {
  const userLinksCollection = collection(db, "userLinks").withConverter(UserLinkConverter);
  const q = query(userLinksCollection, where("uid", "==", user.id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty ? [] : querySnapshot.docs[0].data().links;
};
