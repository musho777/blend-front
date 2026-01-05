import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth/authService";
import { useAuth } from "@/hooks/useAuth";

/**
 * Hook for user login
 */
export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store user data and token in context
      if (data.token && data.user) {
        login(data.user, data.token);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

/**
 * Hook for user registration
 */
export function useRegister() {
  return useMutation({
    mutationFn: authService.register,
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

/**
 * Hook for OTP verification
 */
export function useVerifyOTP() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: authService.verifyOTP,
    onSuccess: (data) => {
      // Store user data and token in context after successful verification
      if (data.token && data.user) {
        login(data.user, data.token);
      }
    },
    onError: (error) => {
      console.error("OTP verification failed:", error);
    },
  });
}

/**
 * Hook for resending OTP
 */
export function useResendOTP() {
  return useMutation({
    mutationFn: authService.resendOTP,
    onError: (error) => {
      console.error("Resend OTP failed:", error);
    },
  });
}

/**
 * Hook for user logout
 */
export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear auth state
      logout();
      // Clear all cached queries
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Still logout on client side even if server request fails
      logout();
      queryClient.clear();
    },
  });
}
