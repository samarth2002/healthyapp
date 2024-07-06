import Glass from "../../components/Glass";
import SignInButton from "../../components/SignInButton";
import UserInfo from "../../components/UserInfo";
import "./globals.css";

export default function Home() {
  console.log(process.env)
  return (
    <main>
      <h1>Adjust the Water Level</h1>
      <SignInButton />
      <UserInfo />
      <Glass />
    </main>
  );
}
