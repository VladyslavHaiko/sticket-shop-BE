import * as bcrypt from 'bcrypt';

export const hashData = (data: string): Promise<string> => bcrypt.hash(data, 10);
export const compareHashData = (data: string, hash: string): Promise<boolean> => bcrypt.compare(data, hash);
