import { useState } from 'react';
import { Box, TextField } from '@mui/material';

export default function OtpVerification({ email, onVerify, onResend, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp.join(''));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-teal-700">We need to verify it's you</h2>
      <div className="text-center">
        <p>We have sent an OTP to the email</p>
        <p className="font-medium">{email}</p>
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            required
            sx={{ width: '48px' }}
            inputProps={{
              style: { textAlign: 'center' }
            }}
          />
        ))}
      </Box>

      <div className="text-center">
        <button type="button" className="text-teal-700 underline" onClick={onResend}>Resend OTP</button>
      </div>

      <button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded">Verify OTP</button>

      <div className="text-center text-sm">
        Wrong email? <button type="button" onClick={onBack} className="text-teal-700 underline">Change email</button>
      </div>
    </form>
  );
} 