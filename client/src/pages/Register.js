import RegisterForm from '../components/auth/RegisterForm';
import '../styles/Auth.css';

const Register = () => {
    return (
        <div className="auth-container">
            <h1 className="auth-title">Register</h1>
            <RegisterForm />
        </div>
    );
};

export default Register;