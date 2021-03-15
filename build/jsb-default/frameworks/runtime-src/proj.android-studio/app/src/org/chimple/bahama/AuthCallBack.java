package org.chimple.bahama;

public interface AuthCallBack {
    public void loginSucceed(String schoolInfo);
    public void loginFailed(String reason);
}
