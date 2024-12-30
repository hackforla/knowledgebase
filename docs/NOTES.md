- Created a single sign on app with no models to see how log in is implemented
- Learned
  - REST_FRAMEWORK supports multiple token types
- PD APIs that need to be supported
  - server job: populate KB data from PD tables (need read only to PD)
  - KB user: Support updating name.  Need update priv for user's user record.
  - KB admin: support updating user info and user roles.  Update user role in KB, then update PD user info and user roles.
- Instructions in https://github.com/hackforla/peopledepot/wiki/Cognito-authentication-workflow-(pre-deployment) worked
# Decisions Needed

- Google Account to use for reading guides stored in Google Drive?  
- Github account used for committing to hackforla repository?
- Where store account and password info?
- What review and testing is needed before launching?
  