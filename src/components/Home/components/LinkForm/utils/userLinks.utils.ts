import { User } from "@/components/AuthContext/AuthContext";
import { db } from "@/config/firebase";
import { getDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export type UserLink = {
  platform: "github" | "youtube";
  url: string;
};

export type UserLinks = {
  links: UserLink[];
};

const UserLinkConverter = {
  toFirestore: (data: UserLinks) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as UserLinks,
};

const getUserLinksDocRef = (user: User) => doc(db, "userLinks", user.id).withConverter(UserLinkConverter);

export const getUserLinks = async (user: User) => {
  const doc = await getDoc(getUserLinksDocRef(user));
  return doc.data()?.links ?? [];
};

export const updateUserLinks = async (user: User, userLinks: UserLink[]) => {
  const docRef = getUserLinksDocRef(user);
  await setDoc(docRef, { links: userLinks });
};
