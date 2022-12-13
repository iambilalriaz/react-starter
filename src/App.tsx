import { Wrapper } from './components/Wrapper';
import LoginForm from './features/authentication/components/LoginForm';
import SignupForm from './features/authentication/components/SignupForm';

export default function App() {
  return (
    <>
      {/* <SignUp /> */}
      <Wrapper>
        {/* <Card>
          <h2>card body</h2>
        </Card> */}
        <LoginForm />
        <SignupForm />
      </Wrapper>
      {/* <ForgotPassword /> */}
    </>
  );
}
