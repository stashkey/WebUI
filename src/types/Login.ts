import type { Record } from "./Record";
import type { Password } from "./Password";

/**
 * Interface for a Login type of record
 */
export interface Login extends Record {
  /**
   * Stores the username of current record
   */
  username: string;
  /**
   * Stores the password of current record
   */
  password: Password;

  /**
   * Stores history of passwords used previously in this login
   */
  passwordHistory: [Password];

  /**
   * Stores an array of urls for websites
   */
  url: [string];
}
