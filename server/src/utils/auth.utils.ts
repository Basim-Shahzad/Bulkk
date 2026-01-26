import { IUser } from "../models/user.model";

// Helper to return user without password and with the store name
export const userForResponse = (user: IUser) => {
   const userObj = user.toObject();
   delete userObj.password;
   // If store is populated, get the name; otherwise keep the ID
   userObj.store = user.store && typeof user.store === 'object' 
      ? (user.store as any).name 
      : user.store;
   return userObj;
};