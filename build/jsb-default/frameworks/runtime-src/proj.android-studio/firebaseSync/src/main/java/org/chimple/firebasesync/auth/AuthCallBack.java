package org.chimple.firebasesync.auth;

public interface AuthCallBack {
    public void loginSucceed(String schoolInfo);
    public void loginFailed(String reason);
}
