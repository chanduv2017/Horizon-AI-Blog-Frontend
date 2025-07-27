import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "../zod.ts";
import axios from "axios";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const Navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const sendRequest = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,
        postInputs,
      );
      const jwt = response.data.jwt;
      const username = response.data.username;
      localStorage.setItem("token", jwt);
      localStorage.setItem("username", username);
      Navigate("/blogs");
    } catch (e) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
      <Container size="sm">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {type == "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-slate-600">
              {type == "signin"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link
                className="text-slate-900 font-medium hover:underline"
                to={type == "signin" ? "/signup" : "/signin"}
              >
                {type == "signin" ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </CardHeader>

          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                sendRequest();
              }}
            >
              {type == "signup" && (
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={postInputs.name}
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    });
                  }}
                  required
                />
              )}

              {type == "signup" && (
                <Input
                  label="Username"
                  placeholder="Choose a username"
                  value={postInputs.username}
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      username: e.target.value,
                    });
                  }}
                  required
                />
              )}

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={postInputs.email}
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  });
                }}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={postInputs.password}
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
                helperText={
                  type === "signup"
                    ? "Must be at least 6 characters"
                    : undefined
                }
                required
              />

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                size="lg"
              >
                {type == "signup" ? "Create Account" : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
