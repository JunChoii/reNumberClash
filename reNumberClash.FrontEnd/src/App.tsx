// App.tsx
import React from "react";
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
                    <CardDescription className="text-sm">
                      Your cards: 1, 2
                    </CardDescription>
                  </div>
                  <Button size="sm">Get new cards</Button>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-9xl font-bold">1</div>
                    <div className="text-9xl font-bold">2</div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-4">
                <Button>Ready</Button>
              </div>
            </div>
            {/* Player 2 card */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex flex-col items-center">
                    <CardTitle className="text-2xl">Player 2</CardTitle>
                    <CardDescription className="text-sm">
                      Your cards: 1, 2
                    </CardDescription>
                  </div>
                  <Button size="sm">Get new cards</Button>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-9xl font-bold">1</div>
                    <div className="text-9xl font-bold">2</div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-4">
                <Button>Ready</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-6">
            <Button size="lg">New Game</Button>
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
