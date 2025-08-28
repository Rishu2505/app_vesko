import { useHaptics } from '@/src/hooks';
import { useTheme } from '@/src/hooks/useTheme';
import { m } from '@/src/utils/metrics';
import { Octicons } from '@expo/vector-icons';
import { debounce } from "lodash";
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import Animated, {
    FadeInDown
} from 'react-native-reanimated';
import { strings } from './constants';
import { useThemedStyles } from './styles';

interface InputProps {
    onEnter: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ onEnter }) => {
    const styles = useThemedStyles();
    const colors = useTheme();
    const [text, setText] = useState('');
    const { selection } = useHaptics();

    const debouncedSearch = React.useMemo(
        () => debounce((query: string) => {
            onEnter(query.trim().toLowerCase());
        }, 300),
        [onEnter]
    );

    React.useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleChange = (value: string) => {
        setText(value);
        if (value.trim().length === 0) {
            onEnter('');
        } else {
            debouncedSearch(value);
        }
    };

    const handleSend = () => {
        if (text.trim().length > 0) {
            selection();
            onEnter(text.trim());
            //setText('');
        }
    };

    const handleFocus = () => {

    };

    const handleBlur = () => {

    };

    return (
        <View style={[styles.wrapper]}>
            <Animated.View
                entering={FadeInDown.duration(300)} style={[styles.container]}>
                <Octicons name="search" size={m(20)} color={colors.text} />
                <TextInput
                    placeholder={strings.placeHolder}
                    placeholderTextColor={colors.appDarkGrey}
                    style={styles.input}
                    value={text}
                    onChangeText={handleChange}
                    onSubmitEditing={handleSend}
                    returnKeyType="send"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </Animated.View>
        </View>
    );
};

export default Input;
