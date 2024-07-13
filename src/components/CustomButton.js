import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import CustomText from './CustomText'

const CustomButton = ({ buttonContent, onPress, buttonStyle, textStyle, type = 'coloredButton', textType = 'buttonText' }) => {
    const buttonChildren = useCallback(() => {
        if (buttonContent && typeof buttonContent === 'string') return <CustomText style={textStyle} type={textType}>{buttonContent}</CustomText>;
        else return buttonContent;
    }, [])
    return (
        <TouchableOpacity style={[styles[type], buttonStyle]} onPress={onPress}>
            {buttonChildren()}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    coloredButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#2094F3',
    },
    transparentButton: {
        padding: 10,
        borderRadius: 5,
    }
})

export default CustomButton