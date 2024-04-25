export type FileInfo = {
  filename: string;
  location: string;
  mimetype: string;
  fieldname: string;
  encoding: string;
  extension: string;
};
export type FilesInfo<T extends string> = {
  [key in T]: FileInfo;
};

export type AccessTokenPayload = {
  id: string;
  email: string;
  username: string;
  userFullname: string;
};
export type RefreshTokenPayload = {
  id: string;
  email: string;
};

declare interface UserProfileInfo {
  id: string;
  affiliation: string;
  address: string;
  bio: string;
  email: string;
  dateOfBirth: string;
  fullname: string;
  gender: string;
  pfp: string;
  cover: string;
  username: string;
}
