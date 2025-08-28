import { useHaptics } from '@/src/hooks';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useThemedStyles } from './styles';

interface FilterChipProps {
    index: number;
    label: string;
    isActive: boolean;
    onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ index, label, isActive, onPress }) => {
    const { selection } = useHaptics();
    const styles = useThemedStyles();

    return (
        <Animated.View entering={FadeInRight.delay(index * 100).duration(800)}>
            <Pressable
                accessible={true}
                accessibilityLabel="Agents filter clicked"
                accessibilityHint={`${label}`}
                accessibilityRole="button"
                style={[styles.chip, isActive && styles.active]}
                onPress={() => {
                    selection()
                    onPress?.();
                }}>
                <View style={styles.contentRow}>
                    <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

export default FilterChip;
