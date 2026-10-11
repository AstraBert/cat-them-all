import { Image } from 'expo-image';
import { Alert, FlatList, Platform, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CATS, TOTAL_CATS } from '@/constants/cats';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useCatCollectionContext } from '@/contexts/cat-collection-context';
import { useTheme } from '@/hooks/use-theme';

export default function CollectionScreen() {
  const collection = useCatCollectionContext();
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const { width } = useWindowDimensions();

  // Calculate card width: (screen width - horizontal padding - gap between cards) / 2
  const horizontalPadding = Spacing.four * 2; // padding on both sides
  const gapBetweenCards = Spacing.three;
  const cardWidth = (width - horizontalPadding - gapBetweenCards) / 2;

  const confirmFreeAll = () => {
    Alert.alert(
      'Free all cats?',
      'Every cat you caught will be released back into the meme wild. The hunt starts over.',
      [
        { text: 'Keep them', style: 'cancel' },
        { text: 'Free them all', style: 'destructive', onPress: () => collection.freeAll() },
      ]
    );
  };

  return (
    <ThemedView style={styles.screen}>
      <FlatList
        data={CATS}
        keyExtractor={(cat) => cat.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: Platform.OS === 'web' ? Spacing.six : safeAreaInsets.top + Spacing.three,
            paddingBottom: safeAreaInsets.bottom + BottomTabInset + Spacing.six,
          },
        ]}
        ListHeaderComponent={
          <ThemedView style={styles.header}>
            <ThemedText type="subtitle">Catdex</ThemedText>
            <ThemedText themeColor="textSecondary">
              {collection.caughtCount} / {TOTAL_CATS} caught
            </ThemedText>
            {collection.caughtCount > 0 && (
              <Pressable
                onPress={confirmFreeAll}
                style={({ pressed }) => [styles.freeButton, pressed && styles.pressed]}>
                <ThemedText type="smallBold" style={styles.freeButtonLabel}>
                  Free them all
                </ThemedText>
              </Pressable>
            )}
          </ThemedView>
        }
        renderItem={({ item: cat }) => {
          const caught = collection.caughtIds.has(cat.id);
          return (
            <ThemedView type="backgroundElement" style={[styles.card, { width: cardWidth }]}>
              <Image
                source={cat.image}
                style={[styles.cardImage, !caught && styles.cardImageHidden]}
                contentFit="cover"
              />
              <ThemedText type="smallBold" style={styles.cardName} numberOfLines={1}>
                {caught ? cat.name : '???'}
              </ThemedText>
              {caught ? (
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={styles.cardMeme}
                  numberOfLines={3}>
                  {cat.meme}
                </ThemedText>
              ) : (
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={styles.cardMeme}
                  numberOfLines={3}>
                  Not caught yet. Keep hunting!
                </ThemedText>
              )}
            </ThemedView>
          );
        }}
        style={{ backgroundColor: theme.background }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  row: {
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  freeButton: {
    marginTop: Spacing.one,
    borderColor: '#d64545',
    borderWidth: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
  },
  pressed: {
    opacity: 0.7,
  },
  freeButtonLabel: {
    color: '#d64545',
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    alignItems: 'center',
    gap: Spacing.two,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Spacing.two,
  },
  cardImageHidden: {
    opacity: 0.15,
  },
  cardName: {
    textAlign: 'center',
    minHeight: 20,
  },
  cardMeme: {
    textAlign: 'center',
    minHeight: 60,
    lineHeight: 18,
  },
});
