"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowLoginPrompt(true);
      // Redirect to home after 3 seconds
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container text-center py-5">
        <div className="mb-4">
          <i className="fas fa-lock" style={{ fontSize: "64px", color: "#dc3545" }} />
        </div>
        <h2>Authentication Required</h2>
        <p className="text-muted mb-4">
          You need to be logged in to view this page.
        </p>
        <p className="text-muted">
          Redirecting to home page in 3 seconds...
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
