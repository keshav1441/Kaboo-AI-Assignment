import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import image from '../assets/image.png';
import TextField from '@mui/material/TextField';
import { Box, InputAdornment, IconButton } from '@mui/material';
import OtpVerification from './OtpVerification';

export default function RealEstatePlatform() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('register'); // 'register', 'verify', or 'dashboard'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setStep("verify");
  };

  const handleVerifyOtp = (otp) => {
    // Here you would typically verify the OTP with your backend
    console.log('Verifying OTP:', otp);
    setStep("dashboard");
  };

  const handleResendOtp = () => {
    // Here you would typically request a new OTP from your backend
    console.log('Resending OTP to:', email);
  };

  return (
    <div className="flex flex-row w-full max-h-[90vh] bg-white text-left font-sans">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
          Partner with real estate agents in your city and accelerate <span className="text-teal-700">your residential project sales</span>
        </h1>
        <p className="text-gray-600 mb-8">
          A plug-and-play platform designed to help real estate developers discover channel partners, manage communication, track site visits, and automate commission calculation - all in one place
        </p>
        <div className="mt-4 relative">
          <img src={image} alt="Real estate agent with computer" className="max-w-md" />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-9 w-full max-w-md">
          {step === "register" ? (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <h2 className="text-xl font-semibold text-teal-700">Create an Account</h2>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  px: 2, 
                  height: '56px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRight: 'none',
                  borderTopLeftRadius: '4px',
                  borderBottomLeftRadius: '4px',
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                }}>
                  <span>+91</span>
                </Box>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Box>

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <p className="text-sm">
                By clicking <span className="font-medium">Create an account</span>, you agree to our <span className="text-teal-700 underline cursor-pointer">T&C</span>.
              </p>

              <button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded">Create an account</button>

              <p className="text-center text-sm mt-4">
                Already have an account? <span className="text-teal-700 underline cursor-pointer">Login</span>
              </p>
            </form>
          ) : step === "verify" ? (
            <OtpVerification
              email={email}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              onBack={() => setStep("register")}
            />
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-teal-700">Verified</h2>
              <p className="text-gray-600">Welcome!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
