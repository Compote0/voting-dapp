'use client';
import { useAccount } from "wagmi";
import Voting from "./components/Voting";
import NotConnected from "./components/NotConnected";

export default function Home() {
  const { isConnected } = useAccount();

  return <>{isConnected ? <Voting /> : <NotConnected />}</>;
}
