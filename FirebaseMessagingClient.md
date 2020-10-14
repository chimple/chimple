Here are steps about how FCM integration works:
1) When child opens chimple app for first time, Firebase Client Message Token is generated and uploaded to FireBase Cloud store document - firebase_messages_sync
2) Firebase_messages_sync document's key is advertising id of each device and payload contains 'firebase_message_token'
3) Using 'firebase_message_token'
4) Event 'fcm_token_generated' is sent to firebase analytics with key 'token' and actual 'token'