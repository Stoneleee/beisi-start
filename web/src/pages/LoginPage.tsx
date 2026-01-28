import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { Welcome } from "../components/Welcome";
import { login } from "../api/auth";
import "./LoginPage.css";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("请输入用户名");
      return;
    }
    if (!password.trim()) {
      setError("请输入密码");
      return;
    }

    setLoading(true);
    try {
      const response = await login(username, password);
      if (response.code === 0 && response.data) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setError("");
      } else if (response.code === 1) {
        setError("用户名或密码错误");
      } else {
        setError(response.message || "登录失败");
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername("");
    setPassword("");
  };

  if (token) {
    return (
      <Welcome username={username} token={token} onLogout={handleLogout} />
    );
  }

  return (
    <LoginForm
      username={username}
      password={password}
      loading={loading}
      error={error}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}
