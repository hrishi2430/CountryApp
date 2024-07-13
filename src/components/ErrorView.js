import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import CustomButton from './CustomButton';
import CustomText from './CustomText';

const ErrorView = ({ errorMessage, onTryAgain }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: "https://cdn.usegalileo.ai/sdxl10/aae1553e-7c3a-40ea-85cf-fdb6eb3c3ad9.png" }}
                />
            </View>

            <CustomText type={'heading'}>Oops, something went wrong.</CustomText>
            <CustomText style={styles.buttonContainer} type={'subHeading'}>{errorMessage ?? `We can't seem to find the information you're looking for. Please try again later.`}</CustomText>

            <View style={styles.buttonContainer}>
                <CustomButton buttonContent={'Try Again'} onPress={onTryAgain} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        padding: 16
    },
    imageContainer: {
        width: '100%',
        padding: 16,
        paddingTop: 12,
    },
    image: {
        width: 'auto',
        minHeight: 240,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    buttonContainer: { padding: 16 },
});

export default ErrorView;
