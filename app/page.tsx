import {LoginButton} from "@/components/auth/login-button";
import { Button } from "@/components/ui/button"
import Nav from "@/app/nav"
export default function Home() {
  return (
    <div className="Home">
      <Nav>
      <LoginButton>
      <Button size={"lg"}>Login</Button>
      </LoginButton>
      </Nav>

      <p className="font-semibold">Home page</p>

    </div>
  );
}
