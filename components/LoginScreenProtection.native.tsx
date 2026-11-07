import { usePreventScreenCapture } from 'expo-screen-capture';

export default function LoginScreenProtection() {
  usePreventScreenCapture('login');
  return null;
}
