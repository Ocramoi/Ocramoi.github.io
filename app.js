import Dropbox from 'dropbox';
const tk = 'x9ufMclnVDAAAAAAAAAB2YORk2Q5rZ9dUSuDZ4Ag0dLDzRyVXLFOmMo-sS2-2lNs';

const dbx = new Dropbox({
  accessToken: tk,
  fetch
});

dbx.filesListFolder({
    path: ''
  }).then(response => console.log(response));