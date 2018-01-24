import { session } from 'electron';

class Cookie {
  domain: string;
  expirationDate: number;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  secure: boolean;
  session: boolean;
  value: string;
  url: string;
}

export class Cookies {
  private currentSession: any;

  constructor() {
    this.currentSession = session.defaultSession.cookies;
  }

  get() {
    return new Promise((res, rej) => {
      this.currentSession.get({}, (error, cookies) => {
        if (error) {
          rej(error);
        } else {
          res(cookies);
        }
      });
    });
  }

  set(cookies) {
    if (cookies) {
      cookies.forEach((c) => {
        const scheme = c.secure ? 'https' : 'http';
        const host = c.domain[0] === '.' ? c.domain.substr(1) : c.domain;
        c.url = scheme + '://' + host;
        this.currentSession.set(c, (error) => {
          if (error) {
            console.dir(error);
          }
        });
      });
    }
  }
}