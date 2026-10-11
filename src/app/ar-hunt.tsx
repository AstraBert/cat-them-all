import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CatCardModal } from '@/components/cat-card-modal';
import { CatSpawner } from '@/components/cat-spawner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VictoryModal } from '@/components/victory-modal';
import { CATS, CatDefinition, TOTAL_CATS } from '@/constants/cats';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useCatCollectionContext } from '@/contexts/cat-collection-context';

export default function ARHuntScreen() {
  const collection = useCatCollectionContext();
  const [caughtCat, setCaughtCat] = useState<CatDefinition | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const pool = CATS.filter((cat) => !collection.caughtIds.has(cat.id));
  const modalOpen = caughtCat !== null || collection.isComplete;

  const handleCatch = (cat: CatDefinition) => {
    collection.catch(cat.id);
    setCaughtCat(cat);
  };

  // Camera permission not yet determined
  if (!permission) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <ThemedView style={styles.loading}>
            <ActivityIndicator size="large" />
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // Camera permission denied
  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <ThemedView style={styles.permissionContainer}>
            <ThemedText type="subtitle" style={styles.permissionTitle}>
              Camera Access Needed
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.permissionText}>
              Cat Them All needs camera access to show cats in your surroundings, just like Pokémon
              GO. The game works offline — no video or photos ever leave your device.
            </ThemedText>
            <Pressable
              onPress={requestPermission}
              style={({ pressed }) => [styles.permissionButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold" style={styles.permissionButtonLabel}>
                Enable Camera
              </ThemedText>
            </Pressable>
            <ThemedText type="small" themeColor="textSecondary" style={styles.permissionHint}>
              You can still play in Classic mode from the Hunt tab.
            </ThemedText>
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // Camera permission granted — show AR view
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <ThemedView style={styles.header} type="backgroundElement">
            <ThemedText type="subtitle">AR Hunt</ThemedText>
            <ThemedText themeColor="textSecondary">
              {collection.loading
                ? 'Waking the cats…'
                : `${collection.caughtCount} / ${TOTAL_CATS} meme cats caught`}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
              Cats blink in and out — tap one before it vanishes!
            </ThemedText>
          </ThemedView>

          {collection.loading ? (
            <ThemedView style={styles.loading}>
              <ActivityIndicator size="large" />
            </ThemedView>
          ) : (
            <View style={styles.arField}>
              <CatSpawner pool={pool} paused={modalOpen} onCatch={handleCatch} />
            </View>
          )}
        </SafeAreaView>
      </CameraView>

      <CatCardModal
        cat={caughtCat}
        caughtCount={collection.caughtCount}
        total={TOTAL_CATS}
        onClose={() => setCaughtCat(null)}
      />
      <VictoryModal visible={!collection.loading && collection.isComplete} onFree={collection.freeAll} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingBottom: BottomTabInset,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  hint: {
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arField: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.six,
    gap: Spacing.three,
  },
  permissionTitle: {
    textAlign: 'center',
  },
  permissionText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionButton: {
    marginTop: Spacing.two,
    backgroundColor: '#208AEF',
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.five,
  },
  pressed: {
    opacity: 0.8,
  },
  permissionButtonLabel: {
    color: '#fff',
  },
  permissionHint: {
    marginTop: Spacing.two,
    textAlign: 'center',
  },
});
