// Temporary email domains to block
const TEMP_EMAIL_DOMAINS = [
  '10minutemail.com', 'tempmail.com', 'guerrillamail.com', 'mailinator.com',
  'throwaway.email', '10minutemail.info', 'temp-mail.org', 'maildrop.cc',
  'mailnesia.com', 'temp-mail.io', 'yopmail.com', 'sharklasers.com',
  'spam4.me', 'trashmail.com', 'fakeinbox.com', '10minutemail.net',
  'tempmail.net', 'guerrillamail.info', 'pokemail.net', 'throwaway.email',
  'email.test', 'testing.com', 'tempmail.co.uk', 'dispostable.com'
];

// Temporary phone prefixes to block
const TEMP_PHONE_PREFIXES = [
  '+1 (555)', '555-', '1234567890', '0000000000', '9999999999'
];

export function isValidEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  const domain = email.split('@')[1].toLowerCase();
  
  if (TEMP_EMAIL_DOMAINS.includes(domain)) {
    return { valid: false, error: 'Temporary email addresses are not allowed' };
  }

  return { valid: true };
}

export function isValidPhone(phone: string): { valid: boolean; error?: string } {
  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Check minimum length (international format)
  if (cleanPhone.length < 10) {
    return { valid: false, error: 'Phone number must be at least 10 digits' };
  }

  // Check for temp phone patterns
  for (const prefix of TEMP_PHONE_PREFIXES) {
    if (phone.includes(prefix)) {
      return { valid: false, error: 'Please provide a valid phone number' };
    }
  }

  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('At least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('One uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('One lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('One number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('One special character');
  }

  return { valid: errors.length === 0, errors };
}

export async function connectWeb3Wallet(): Promise<{ address: string; name: string } | null> {
  try {
    // Check if MetaMask or Web3 wallet is available
    if (!(window as any).ethereum) {
      alert('Please install MetaMask or another Web3 wallet');
      return null;
    }

    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      return null;
    }

    const address = accounts[0];
    const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

    return {
      address,
      name: shortAddress,
    };
  } catch (error) {
    console.error('Web3 connection failed:', error);
    return null;
  }
}

export async function authenticateWithGoogle(): Promise<{ name: string; email: string; avatar: string } | null> {
  try {
    // This would integrate with Google Sign-In library
    // For now, returning a placeholder that expects client-side Google SDK integration
    return null;
  } catch (error) {
    console.error('Google authentication failed:', error);
    return null;
  }
}
