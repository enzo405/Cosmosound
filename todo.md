# Must have:

- Backend => Previous music, Next music
- Backend => On user creation, add playlist liked songs
- Backend => On music like add to Liked Songs playlist
- Backend => On user creation lower case the email to avoid confusing

- Dockerfile => keyfile replicaset in dockercompose

- Frontend => add error boundary
- Frontend => Fix space and inputs
- Frontend => searchbar don't search if whitespace
- Frontend => Login add remember me
- Frontend => song settings replace box for add playlist instead of adding another box
- Frontend => add google/spotify/deezer oauth ?

- CI/CD => Add semantic release to CICD and add version in footer or somewhere

- Security => Add cloudflare/ anti bot feature

# Good to have:
- Frontend => Load songs and cache them when user like
- Frontend => Loading icon and check server response if alive every 5sec
- Backend & Frontend => Add previous password if the user want to change password
- Backend & Frontend => Add forgot password feature
- Load next musics when listening music
- Make a page to create playlist and add music more easier
- Add ref on MusicItem to track it size and adjust the item depending on its size instead of the media query
- Add ref on Body content to track it size and adjust the rest depending on its size instead of the media query
- /explore => make pages for each filters instead of filtering content (e.g => /explore/artists, /explore/musics)
- Artist page make top part sticky
- <Link> tag for links (accessibility) instead of onClick
- Add expand/resize button on sidebar
- Api client interceptor in axios client => get err message
- Put genres of artist on artist page (same for catalog, playlist)

# Bugs:
- Upload picture can have more than 1 share link
- Update social media doesn't work
- re-auth on music endpoint or pass userid
- with VPN i got Bad Gateway when uploading idk