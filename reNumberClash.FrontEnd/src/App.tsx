import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import useSignalR from "./useSignalR";

interface AppProps {
  username: string;
}

export default function App({ username }: AppProps) {
  const { connection } = useSignalR("/r/gamehub");

  useEffect(() => {
    if (connection) {
      connection.on("SendUsername", (message: string) => {
        setOpponentUsername(message);
      });
    }
  }, [connection]);

  // Function to generate random number between 1 and 10
  const generateRandomNumber = () => Math.floor(Math.random() * 10) + 1;
  const [opponentUsername, setOpponentUsername] = useState("Opponent");
  // State to manage user's cards and the number of times "Get new numbers" button has been clicked
  const [userCard1, setUserCard1] = useState(generateRandomNumber());
  const [userCard2, setUserCard2] = useState(generateRandomNumber());
  const [userGetNewNumbersCount, setUserGetNewNumbersCount] = useState(0);

  // Function to generate new numbers for the user
  const handleGetNewUserNumbers = () => {
    if (userGetNewNumbersCount < 3) {
      setUserCard1(generateRandomNumber());
      setUserCard2(generateRandomNumber());
      setUserGetNewNumbersCount(userGetNewNumbersCount + 1);
    }
  };

  // Game logic functions
  const calculateCombination = (card1: number, card2: number): string => {
    if (card1 === card2) {
      return `${card1} Tankers`;
    } else {
      let sum = card1 + card2;
      if (sum > 10) {
        sum %= 10;
      }
      return `${sum} Pistoles`;
    }
  };

  const userCombination = calculateCombination(userCard1, userCard2);

  const compareCombination = (combination1: string): string => {
    // Logic for comparing combinations

    return ""; // Add a return statement here
  };

  const result = compareCombination(userCombination);

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log("this is the event: ");
    console.log(event);

    await fetch("http://localhost:5173/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCard1: userCard1,
        userCard2: userCard2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-50 dark:bg-gray-850">
        <div className="container px-4 py-2">
          <div className="flex items-center justify-between">
            <Link className="flex items-center space-x-2" href="#">
              <span className="text-lg font-bold tracking-tight text-gray-700 dark:text-gray-300">
                Number Clash
              </span>
              <div
                className={`w-3 h-3 rounded-full mr-1 ${
                  connection ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Player 1 card */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex flex-col items-center">
                    <CardTitle className="text-2xl">{username}</CardTitle>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleGetNewUserNumbers}
                    disabled={userGetNewNumbersCount >= 3}
                  >
                    Get new numbers
                  </Button>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-9xl font-bold">{userCard1}</div>
                    <div className="text-9xl font-bold">{userCard2}</div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-4">
                <form onSubmit={handleSubmit}>
                  <input
                    className="btn bg-[black] text-white px-5 py-2 rounded-md cursor-pointer w-full"
                    type="submit"
                    value="Ready"
                  />
                </form>
              </div>
            </div>
            {/* Player 2 card */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex flex-col items-center">
                    <CardTitle className="text-2xl">{opponentUsername}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-9xl font-bold">?</div>
                    <div className="text-9xl font-bold">?</div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-4">
                {/* <Button>Ready</Button> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-6">
            <Button size="lg">New Game</Button>
            <div className="mt-4 text-lg font-semibold">{result}</div>
          </div>
        </div>
      </main>
      <footer className="border-t py-2 bg-gray-50 dark:bg-gray-850">
        <div className="container flex justify-between px-4 items-center text-sm text-gray-500 dark:text-gray-400">
          <span>© 2023 Number Clash</span>
        </div>
      </footer>
    </div>
  );
}
