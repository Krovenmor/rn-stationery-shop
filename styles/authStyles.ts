import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  form: { width: '100%', maxWidth: 400, alignSelf: 'center', gap: 16 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  hint: { fontSize: 14, color: '#666', textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    minHeight: 48, borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: '#222',
  },
  passwordRow: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#ddd', borderRadius: 12,
  },
  passwordInput: { flex: 1, minWidth: 0, borderWidth: 0 },
  toggle: { padding: 12 },
  toggleText: { color: '#43a047', fontWeight: '600' },
  button: {
    backgroundColor: '#43a047', paddingVertical: 14,
    borderRadius: 12, alignItems: 'center',
  },
  githubButton: { backgroundColor: '#24292f' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  disabled: { opacity: 0.5 },
  error: { color: '#c62828', textAlign: 'center' },
});
