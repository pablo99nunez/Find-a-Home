var { useAuth0 } = require('@auth0/auth0-react');
var React = require('react');

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  
  return <button onClick={() => loginWithRedirect()}>Log in</button>;
}

function Profile() {
  const { user, getAccessTokenSilently } = useAuth0();

  const [jwt, setJwt] = React.useState(null);
  
  React.useEffect(() => {
    async function getJwt() {
      if (user) {
        const token = await getAccessTokenSilently();
        setJwt(token);
      }
    }
    getJwt();
  }, [user, getAccessTokenSilently]);

  return jwt ? <p>Your JWT: {jwt}</p> : <p>Please log in to see your JWT</p>;
}
module.exports = {
  LoginButton,
  Profile
}