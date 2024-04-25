export interface IConverseDocument {
  _id: string;
  messengers_id: string[];
  messengers: unknown[];
  createdAt: Date;
  updatedAt: Date;
  unread: IUnread[];
  messages_id: string[];
  messages: IMessageDocument[];
}

export interface IUserDocument {
  _id: string;
  username: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  date_of_birth: Date;
  gender: TGender;
  address: IAddress;
  role: TGender;
  affiliation: TAffiliation;
  account_visibility: TAccountVisibility;
  createdAt: Date;
  updatedAt: Date;

  liked_posts_id: string[];
  disliked_posts_id: string[];
  up_voted_comments_id: string[];
  down_voted_comments_id: string[];
  liked_projects_id: string[];
  disliked_projects_id: string[];
  convere_id: string[];
  follower_ids: string[];
  followind_ids: string[];

  credentials: ICredentialDocument;
  posts: IPostDocument[];
  projects: IProjectDocument[];
  notifications: INotificationDocument[];
  comments: ICommentDocument[];
  conversations: IConverseDocument[];
  liked_posts: IPostDocument[];
  disliked_posts: IPostDocument[];
  liked_projects: IProjectDocument[];
  disliked_projects: IProjectDocument[];
  up_voted_comments: ICommentDocument[];
  down_voted_comments: ICommentDocument[];
  followers: IUserDocument[];
  followings: IUserDocument[];
}

export interface ICredentialDocument {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUserDocument;
}

export interface IPostDocument {
  _id: string;
  title?: string;
  context: string;
  media?: IPostMedia[];
  status: TPostStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;

  liked_by_users_id: string[];
  disliked_by_users_id: string[];
  author_id: string;

  liked_by_users: IUserDocument[];
  disliked_by_users: IUserDocument[];
  author: IUserDocument;
  comments: ICommentDocument[];
}

export interface IProjectDocument {
  _id: string;
  title: string;
  context: string;
  tags: string[];
  media?: IProjectMedia[];
  projectStatus: TPostStatus;
  createdAt: Date;
  updatedAt: Date;
  labels: string[];

  liked_by_users_id: string[];
  disliked_by_users_id: string[];
  author_id: string;

  liked_by_users: IUserDocument[];
  disliked_by_users: IUserDocument[];
  author: IUserDocument;
  comments: ICommentDocument[];
}

export interface ICommentDocument {
  _id: string;
  type: TCommentType;
  content: string;
  status: TPostStatus;
  createdAt: Date;
  updatedAt: Date;

  upvoted_by_users_id: string[];
  downvoted_by_users_id: string[];
  reply_to_id?: string;
  author_id: string;
  post_id?: string;
  project_id?: string;
  replies_id: string[];

  up_voted_by_users: IUserDocument[];
  down_voted_by_users: IUserDocument[];
  author: IUserDocument;
  replies?: ICommentDocument[];
  replied_to?: ICommentDocument;
}

export interface IMessageDocument {
  _id: string;
  converse_id: string;
  author_id: string;
  type: TMessageType;
  media?: IPostMedia[];
  chat?: string;
  createdAt: Date;
  status: TMessageStatus;
  recipient_id: string;
}

export interface INotificationDocument {
  _id: string;
  type: TNotificationType;
  createdAt: Date;
  updatedAt: Date;

  notifTo_id: string;
  notifFrom_id: string;
  post_id?: string;
  comment_id?: string;
}

interface IAddress {
  barangay: string;
  municipality: string;
  province: string;
}

type TAffiliation = "WOOD_WORKER" | "WOOD_ENTHUSIAST" | "WOOD_CRAFTER";
type TPRoffeciency = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
type TGender = "MALE" | "FEMALE";
type TRole = "ADMIN" | "USER";

// * TYPES
export interface IMessage {
  id: string;
  author_id: string;
  type: TMessageType;
  media?: IPostMedia[];
  chat?: string;
  createdAt: Date;
  status: TMessageStatus;
  converse_id: string;
  recipient_id: string;
}

interface IUserImage {
  pfp_name: string;
  cover_name: string;
}

interface IPostMedia {
  filename: string;
  caption: string | undefined;
}

interface IProjectMedia {
  filename: string;
  caption: string | undefined;
}

interface IUnread {
  user_id: string;
  count: number;
}

// * ENUMS

type TNotificationType = "POST_REACT" | "POST_COMMENT" | "FOLLOW";
type TAccountVisibility = "PUBLIC" | "PRIVATE";
type TMessageType = "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "FILE";
type TCommentType = "POST" | "PROJECT";
type TUserStatus = "ACTIVE" | "ARCHIVED";
type TUserActivity = "ONLINE" | "OFFLINE";
type TPostStatus = "ACTIVE" | "ARCHIVED";
type TMessageStatus = "SENT" | "DELIVERED" | "READ";
