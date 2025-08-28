import { CustomHeader } from "@/src/components";
import { useGlobalThemedStyles } from "@/src/styles";
import React from "react";
import { View } from "react-native";
import { strings } from "./constants";


export function ProductDetail() {
    const globalStyles = useGlobalThemedStyles();


    const onLeftIconPress = () => {
        console.log('Send icon pressed')
    }

    const onRightIconPress = () => {
        console.log('Notification icon pressed')
    }

    return (
        <View style={globalStyles.mainContainer}>
            <CustomHeader
                title={strings.title}
                leftIcon="back"
                rightIcon="dots-three-horizontal"
                onLeftIconPress={onLeftIconPress}
                onRightIconPress={onRightIconPress}
            />
        </View>
    );
}
