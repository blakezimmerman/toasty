export interface IPost {
  _id: string;
  user: string;
  content: string;
  imageUrl: string;
  toastConfidence: number;
  comments: string[];
}
