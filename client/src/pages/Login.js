import LoginForm from '../components/auth/LoginForm';
import '../styles/Auth.css';

const Login = () => {
    return (
        <div className="auth-container">
            <h1 className="auth-title">Login</h1>
            <LoginForm />
        </div>
    );
};

export default Login;