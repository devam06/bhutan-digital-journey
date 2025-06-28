
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to e-Residency of Bhutan!"
        });
        navigate('/application');
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGmailLogin = async () => {
    setLoading(true);
    try {
      await loginWithGmail();
      toast({
        title: "Gmail Login Successful",
        description: "Welcome to e-Residency of Bhutan!"
      });
      navigate('/application');
    } catch (error) {
      toast({
        title: "Gmail Login Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 traditional-pattern">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-noto font-bold text-bhutan-wood mb-2">
            e-Residency of Bhutan
          </h1>
          <p className="text-bhutan-wood/70 font-medium">
            Gateway to the Kingdom of Happiness
          </p>
        </div>

        <div className="bhutan-card p-8">
          <h2 className="text-2xl font-noto font-semibold text-center mb-6 text-bhutan-wood">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-bhutan-wood mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bhutan-input w-full"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-bhutan-wood mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bhutan-input w-full"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bhutan-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-bhutan-saffron/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-bhutan-wood/60">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGmailLogin}
              disabled={loading}
              className="mt-4 w-full bg-white border-2 border-bhutan-saffron/30 text-bhutan-wood font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Login with Gmail</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-bhutan-wood/60">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
