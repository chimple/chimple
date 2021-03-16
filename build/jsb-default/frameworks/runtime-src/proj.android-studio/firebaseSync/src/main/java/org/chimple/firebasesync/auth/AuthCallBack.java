package org.chimple.firebasesync.auth;

public interface AuthCallBack {
    public void loginSucceed(String schoolInfo, boolean shouldCallBack);
    public void loginFailed(String reason);
}
