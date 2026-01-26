export type Fields = {
  name: string;
  email: string;
  message: string;
};

export type Touched = {
  name: boolean;
  email: boolean;
  message: boolean;
};

export type Errors = {
  name?: string;
  email?: string;
  message?: string;
};
