export interface IUserSession {
  id: string;
  name: string;
  email: string;
  sessionId: string;
}

export interface ISession {
  userAgent: string;
  geo: string;
  ip: string;
  image?: string;
  device?: string;
  type?: string;
  os?: string;
  browser?: string;
  model?: string;
}
