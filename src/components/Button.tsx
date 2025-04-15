import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";
import { Colors } from "../types/Colors";
import app from '../../app.json';

interface Props {
    children: any;
    type?: Colors;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    outline?: boolean;
    disabled?: boolean;
    style?: any;
}

export default function Button ({
    children,
    type='primary',
    outline=false,
    onPress,
    disabled=false,
    style
} : Props) {

    const buttonStyle = outline ? {
        borderColor: app.style.colors[type],
        borderWidth: 3,
    } : {
        borderColor: app.style.colors[type],
        borderWidth: 3,
        backgroundColor: app.style.colors[type],
    }

    const textStyle = outline? {
        color: app.style.colors[type],
    } : {
        color: 'white',
    }

    const styles = StyleSheet.create({
        button: {
            ...buttonStyle,
            opacity: disabled? 0.5: 1,
            borderRadius: 7,
            alignSelf: 'center',
            padding: 12
        },
        text: {
            ...textStyle,
            fontWeight: '900',
        }
    });

    children = typeof children == "string" ? <Text style={styles.text} >{children}</Text> : children

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            disabled={disabled}
        >
            {children}
        </TouchableOpacity>
    );
}
