# TODOS

- check all error states for:
  - `/login`
  - `/signup`
  - `/forgot-password`
  - `/reset-password`
- prefetch the list during login? currently the <List> component is fetching the list on mount, causing a seemingly empty screen for a split second
- you can reset password while being logged in - is that ok?
- logout? - currently you can't logout
- make the scroll buttons animate in and out?
- snackbars for successful saving, or errors
- save only when links have changed
- only save if the updated_at hasn't changed
- CAPTCHA for anonymous signins
- Can we skip supabase altogether for anonymous login?
- Add "Delete account" functionality
