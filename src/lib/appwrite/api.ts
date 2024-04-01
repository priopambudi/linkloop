import { INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases } from './config';
import { ID } from 'appwrite';

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) => {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const session = account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
};
