window.onload = () => {
 fetch('https://vercel.danielvera987.vercel.app/custom-build/public')
  .then(response => response.json())
  .then(data => console.log(data))   
}