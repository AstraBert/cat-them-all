import { Image } from 'expo-image';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CatDefinition } from '@/constants/cats';
import { Spacing } from '@/constants/theme';

interface CatCardModalProps {
  cat: CatDefinition | null;
  caughtCount: number;
  total: number;
  onClose: () => void;
}

/** The card shown when a cat is caught: portrait, name, meme lore, fun fact. */
export function CatCardModal({ cat, caughtCount, total, onClose }: CatCardModalProps) {
  return (
    <Modal visible={cat !== null} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <ThemedView type="backgroundElement" style={styles.card}>
          {cat && (
            <>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.banner}>
                GOTCHA!
              </ThemedText>
              <Image source={cat.image} style={styles.image} contentFit="cover" />
              <ThemedText type="subtitle" style={styles.name}>
                {cat.name}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.meme}>
                {cat.meme}
              </ThemedText>
              <ThemedText style={styles.funny}>{cat.funnyLine}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {caughtCount} / {total} cats caught
              </ThemedText>
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
                <ThemedText type="smallBold" style={styles.buttonLabel}>
                  Keep hunting
                </ThemedText>
              </Pressable>
            </>
          )}
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: Spacing.four,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  banner: {
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: Spacing.three,
    marginVertical: Spacing.two,
  },
  name: {
    textAlign: 'center',
  },
  meme: {
    textAlign: 'center',
  },
  funny: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: Spacing.one,
  },
  button: {
    marginTop: Spacing.three,
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
