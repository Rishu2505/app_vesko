import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useHaptics } from '../../hooks';

export default function HapticTab(props: BottomTabBarButtonProps) {
    const { selection } = useHaptics();
    return (
        <PlatformPressable
            {...props}
            onPressIn={(ev) => {
                selection();
                props.onPressIn?.(ev);
            }}
        />
    );
}
