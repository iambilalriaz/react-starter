import { Wrapper } from './components/Wrapper';
import LoginForm from './features/authentication/components/LoginForm';
// import SignUp from './pages/SignUp';

export default function App() {
  return (
    <div>
      {/* <SignUp /> */}
      <Wrapper>
        {/* <Card>
          <h2>card body</h2>
        </Card> */}
        <LoginForm />
      </Wrapper>
      {/* <ForgotPassword /> */}
    </div>
  );
}
