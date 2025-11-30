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

// Load Google Sign-In SDK
export function loadGoogleSignInSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google?.accounts?.id) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Sign-In SDK'));
    document.head.appendChild(script);
  });
}

// Real Google OAuth authentication
export async function authenticateWithGoogle(): Promise<{ name: string; email: string; avatar: string; idToken: string } | null> {
  try {
    await loadGoogleSignInSDK();
    
    return new Promise((resolve) => {
      (window as any).google?.accounts?.id?.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
        callback: (response: any) => {
          if (response.credential) {
            // Decode JWT token to get user info
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => 
              '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            
            const decoded = JSON.parse(jsonPayload);
            resolve({
              name: decoded.name,
              email: decoded.email,
              avatar: decoded.picture,
              idToken: response.credential,
            });
          }
        },
        error: () => resolve(null),
      });

      (window as any).google?.accounts?.id?.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );
      
      (window as any).google?.accounts?.id?.prompt();
    });
  } catch (error) {
    console.error('Google authentication failed:', error);
    return null;
  }
}

// Web3 Message Signing for Account Verification
export async function signMessageWithWeb3Wallet(message: string): Promise<{ signature: string; address: string } | null> {
  try {
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
    
    // Sign message with wallet
    const signature = await (window as any).ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });

    return {
      signature,
      address,
    };
  } catch (error) {
    console.error('Web3 signing failed:', error);
    return null;
  }
}
