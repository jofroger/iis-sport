export class UserCtx {
    static userId : Number = -1;

    static setUserCtx(id : Number) {
        UserCtx.userId = id;
    }

    static getUserCtx() {
        return UserCtx.userId;
    }
}