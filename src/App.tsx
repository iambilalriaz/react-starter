import { RouterProvider } from 'react-router-dom';
import { Wrapper } from './components/Wrapper';
import ForgotPassword from './pages/ForgotPassword';
import { router } from './router';
// import SignUp from './pages/SignUp';
export default function App() {
  return (
    <RouterProvider router={router}>
      {/* <SignUp /> */}
      <Wrapper>
        {/* <Card>
          <h2>card body</h2>
        </Card> */}
      </Wrapper>
      <ForgotPassword />
    </RouterProvider>
  );
}
