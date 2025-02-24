# TODOS

- check all error states for:
  - `/login`
  - `/signup`
  - `/forgot-password`
  - `/reset-password`
- prefetch the list? currently the <List> component is fetching the list on mount, causing a flicker
- you can reset password while being logged in - is that ok?
- logout? - currently you can't logout
- make the scroll buttons animate in and out?
- snackbars for successful saving, or errors
- save only when links have changed
- only save if the updated_at hasn't changed
- warn if the user is about to navigate away with unsaved changes
