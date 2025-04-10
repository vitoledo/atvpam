import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const IdealWeight = ({ altfeito }) => {
    let alm = parseFloat(altfeito) / 100

    return (
        <View>
            <Text style={styles.ideal}>
                Peso <Text style={styles.textg}>mínimo</Text>  ideal = {((alm * alm) * 18.5).toFixed(2)}
            </Text>
            <Text style={styles.ideal}>
                Peso <Text style={styles.textr}>máximo</Text> ideal = {((alm * alm) * 24.9).toFixed(2)}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    ideal: {
        marginTop: 20,
        fontSize: 24,
        textAlign: 'center',
        color: '#333',
    },
    textg: {
        color: 'green',
    },
    textr: {
        color: 'red',
    },
});

export default IdealWeight;