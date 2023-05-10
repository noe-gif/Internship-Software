import { useState } from 'react';

export default function loginHook(loginRequestAction) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [revealPassword, setRevealPassword] = useState(false);

  const handleSubmitLogin = async () => {
    const credentials = { username, password };
    await loginRequestAction(credentials);
    setUsername('');
    setPassword('');
  };
  return {
    handleSubmitLogin,
    password,
    revealPassword,
    setPassword,
    setRevealPassword,
    setUsername,
    username,
  };
}
