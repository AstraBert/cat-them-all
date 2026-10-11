import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TOTAL_CATS } from '@/constants/cats';
import { Spacing } from '@/constants/theme';

interface VictoryModalProps {
  visible: boolean;
  onFree: () => Promise<void>;
}

/** Shown when every meme cat has been caught. Freeing them resets the game. */
export function VictoryModal({ visible, onFree }: VictoryModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="title" style={styles.emoji}>
            🏆
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            You caught them all!
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.body}>
            All {TOTAL_CATS} meme cats are safely in your collection. The internet is at
            peace… for now.
          </ThemedText>
          <Pressable
            onPress={onFree}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <ThemedText type="smallBold" style={styles.buttonLabel}>
              Free them all &amp; play again
            </ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: Spacing.four,
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.three,
  },
  emoji: {
    fontSize: 72,
    lineHeight: 84,
  },
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.two,
    backgroundColor: '#f5a623',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.five,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonLabel: {
    color: '#1d1305',
  },
});
