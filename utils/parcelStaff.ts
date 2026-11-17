import type {User} from "../types";
/* ────────── parcel waiters use a dedicated home; supervisors keep table access ────────── */
export function isParcelStaff(user:Pick<User,"role"|"permissions">|undefined|null){
 return user?.role==="waiter" && user.permissions.includes("orders:parcel");
}
