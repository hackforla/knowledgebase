- Created a single sign on app with no models to see how log in is implemented
- Learned
  - REST_FRAMEWORK supports multiple token types
- PD APIs that need to be supported
  - server job: populate KB data from PD tables (need read only to PD)
  - KB user: Support updating name.  Need update priv for user's user record.
  - KB admin: support updating user info and user roles.  Update user role in KB, then update PD user info and user roles.
- Instructions in https://github.com/hackforla/peopledepot/wiki/Cognito-authentication-workflow-(pre-deployment) worked
  