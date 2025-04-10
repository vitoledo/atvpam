# Calculadora IMC
---
## App.js
### 1.
- Aqui no começo importei todos os comandos que foram usados e as funções também.
```javascript
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Text } from 'react-native';
import Title from './src/components/Title';
import FormIMC from './src/components/FormIMC';
```
### 2.
- Nessa parte é organizado a tela, o que o usuário enxerga tem que estar aqui, pois esse é o arquivo que roda para o funcionamento.
- `KeyboardAvoidingView` e `TouchableWithoutFeedback`, são tags do __React__ que eu tive que pesquisar pra por, pois no meu celular o teclado numérico sobrepunha as informações, então essas tags fazem com que a caixa dos inputs subam junto com a tela.

```javascript
export default function App() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Title />
          <FormIMC />
          <View style={styles.footer}>
            <Text style={styles.footerText} >©Victor de toledo</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
```

### 3.
- Aqui está a parte da estilização, sem muita coisa pra falar kkkkk :)

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  footerText: {
    color: 'purple',
    fontSize: 18,
  },
```

---

## FormIMC.js
### 1.
- Aqui no começo importei todos os comandos que foram usados e as funções também.

```javascript
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Result from './Result';
import Classification from './Classification';
import IdealWeight from './IdealWeight';
```
### 2.
- Nessa parte esta a função que calcula o IMC e a função que dispara a mensagem de erro quando o usuário não colocar valor nas caixas de entrada.

```javascript
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
```

### 3.
- Aqui além da estilização lá embaixo, temos toda a area do formulário que é apresentado no `App.js`, com as requisições e a apresentação dos `Result.js`, `Classification.js` e `idealWeight.js`.

```javascript
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
```

---

## Result.js
### 1.
- Aqui no começo importei todos os comandos que foram usados e as funções também.

```javascript
import React from 'react';
import { Text, StyleSheet } from 'react-native';
```
### 2.
- E aqui está a função que apresenta o resultado e a estilização desse texto.

```javascript
const Result = ({ imc }) => {
  return (
    <Text style={styles.result}>Seu IMC é: {imc}</Text>
  );
};

const styles = StyleSheet.create({
  result: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
  },
});

export default Result;
```

---

## Title.js
### 1.
- Aqui no começo importei todos os comandos que foram usados.

```javascript
import { Text, StyleSheet } from 'react-native';
```

### 2.
- E aqui está a função que apresenta o titulo e a estilização desse texto.

```javascript
const Title = () => {
  return (
    <Text style={styles.title}>Calculadora de IMC</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: 'purple',
  },
});

export default Title;
```

---

## Classification.js
### 1.
- Aqui no começo importei todos os comandos que foram usados.

```javascript
import React from 'react';
import { Text, StyleSheet } from 'react-native';
```
### 2.
-  Aqui esta a função que faz a classificação, usando if e else para diferenciar as classificações.

```javascript
const Classification = ({ imc }) => {
    if (imc < 18.5) {
        return (
            <Text style={styles.classification}>Sua Classificação é: Abaixo do Peso</Text>
        );
    } else if (imc < 24.9) {
        return (
            <Text style={styles.classification}>Sua Classificação é: Peso Normal</Text>
        );
    } else if (imc < 34.9) {
        return (
            <Text style={styles.classification}>Sua Classificação é: Sobrepeso</Text>
        );
    } else if (imc < 39.9) {
        return (
            <Text style={styles.classification}>Sua Classificação é: Obesidade grau 1</Text>
        );
    } else {
        return (
            <Text style={styles.classification}>Sua Classificação é: Obesidade grau 2</Text>
        );
    }

};
```

### 3.
- Aqui está a estilização desses textos.

```javascript
const styles = StyleSheet.create({
    classification: {
        marginTop: 20,
        fontSize: 24,
        textAlign: 'center',
        color: '#333',
    },
});
```

---

## IdealWeight.js
### 1.
-  Aqui no começo importei todos os comandos que foram usados.

```javascript
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
```
### 2.
-  Aqui está a função que apresenta os pesos ideais.

```javascript
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
```

### 3.
- Aqui está a estilização desses textos.

```javascript
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
```

---
# Vídeo Explicativo
![](videoexplicativo.mp4)