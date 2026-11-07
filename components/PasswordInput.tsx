import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { authStyles as styles } from '../styles/authStyles';

export default function PasswordInput({ value, onChangeText, onSubmitEditing, editable }: {
  value: string;
  onChangeText: (value: string) => void;
  onSubmitEditing: () => void;
  editable: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.passwordRow}>
      <TextInput
        accessibilityLabel="Пароль"
        style={[styles.input, styles.passwordInput]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!visible}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="current-password"
        returnKeyType="go"
        editable={editable}
        onSubmitEditing={onSubmitEditing}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={visible ? 'Скрыть пароль' : 'Показать пароль'}
        onPress={() => setVisible(!visible)}
        style={styles.toggle}
      >
        <Text style={styles.toggleText}>{visible ? 'Скрыть' : 'Показать'}</Text>
      </Pressable>
    </View>
  );
}
