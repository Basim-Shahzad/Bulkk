declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        storeId: string;
        role: string;
      };
    }
  }
}