package org.chimple.firebasesync.auth;

import java.util.concurrent.Executor;

public class FirebaseAuthWithGoogle implements Executor {
    @Override
    public void execute(Runnable command) {
        command.run();
    }
}
