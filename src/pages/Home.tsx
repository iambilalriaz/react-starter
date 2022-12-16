import { Card } from '../components/Card';
import { Wrapper } from '../components/Wrapper';

export default function Home() {
  return (
    <div className="grid place-items-center h-screen">
      <Wrapper>
        <Card>
          <p className="text-lg">Welcome to your dashboard Home page</p>
        </Card>
      </Wrapper>
    </div>
  );
}
