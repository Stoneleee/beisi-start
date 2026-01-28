interface WelcomeProps {
  username: string;
  token: string;
  onLogout: () => void;
}

export function Welcome({ username, token, onLogout }: WelcomeProps) {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2>欢迎，{username || "admin"}</h2>
        <p className="token-info">Token: {token.slice(0, 8)}...</p>
        <button className="btn btn-logout" onClick={onLogout}>
          退出登录
        </button>
      </div>
    </div>
  );
}
