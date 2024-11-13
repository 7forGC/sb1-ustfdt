import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogoIcon } from '../components/LogoIcon';
import { DonationHeart } from '../components/DonationHeart';
import { AlertCircle, Heart } from 'lucide-react';

export const AuthPage = () => {
  const { signInWithGoogle, signInWithFacebook, signInAsGuest, error: authError, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800">
      <nav className="bg-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <LogoIcon className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-white font-semibold text-xl">7 for all GC</div>
              <DonationHeart />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl">
        <div className="text-center mb-8">
          <LogoIcon className="h-12 w-12 mx-auto text-purple-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Welcome to 7 for all GC</h2>
          <p className="mt-2 text-gray-600">Connect with everything that is good</p>
        </div>

        {authError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <div className="space-y-4">
          <Link
            to="/register"
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-custom text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
            Continue with Google
          </button>

          <button
            onClick={signInWithFacebook}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="h-5 w-5 mr-2" />
            Continue with Facebook
          </button>

          <button
            onClick={signInAsGuest}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Continue as Guest
            <span className="ml-2 text-sm opacity-75">(3 visits/day)</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <button
              onClick={() => window.open('https://donate.stripe.com/test_donation', '_blank')}
              className="group inline-flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Heart className="h-5 w-5 group-hover:fill-current" />
              <span>Support Our Project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};