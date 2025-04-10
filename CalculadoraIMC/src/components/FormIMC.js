import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Result from './Result';
import Classification from './Classification';
import IdealWeight from './IdealWeight';

const FormIMC = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [altfeito, setAltfeito] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const calcularIMC = () => {
    if (!peso || !altura || parseFloat(peso) === 0 || parseFloat(altura) === 0) {
      setMensagemErro('Peso e altura devem ser maiores que zero.');
      setImc(null);
      return;
    }

    setMensagemErro('');
    let alturaMetros = parseFloat(altura) / 100;
    let imcCalculado = (parseFloat(peso) / (alturaMetros * alturaMetros)).toFixed(2);
    setImc(imcCalculado);
    setAltfeito(altura);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <Button title="Calcular IMC" onPress={calcularIMC} color="purple"/>
      
      
      {mensagemErro ? <Text style={styles.errorText}>{mensagemErro}</Text> : null}

      
      {imc && <Result imc={imc} />}
      {imc && <Classification imc={imc} />}
      {imc && <IdealWeight altfeito={altfeito} />}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
  },
  input: {
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default FormIMC;