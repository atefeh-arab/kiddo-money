import React from 'react';
import logo from '../assets/logo.png';

export default function AppLogo({ size = 32 }) {
  return (
    <img
      src={logo}
      alt="لوگو مانی بی (Money Bee)"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        backgroundColor: '#FFF8E7',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        flexShrink: 0
      }}
    />
  );
}
