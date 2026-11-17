import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const num = (t) => (t.trim() === '' ? NaN : Number(t.replace(',', '.')));

export default function App() {
  const [nome, setNome] = useState('');
  const [ini, setIni] = useState('');
  const [mov, setMov] = useState('');
  const [estoque, setEstoque] = useState(null);
  const [msg, setMsg] = useState('');

  const iniciar = () => {
    const q = num(ini);
    if (nome.trim() === '' || !Number.isInteger(q) || q < 0)
      return setMsg('Informe o nome e uma quantidade inicial inteira (≥ 0).');
    setEstoque(q);
    setMsg('');
  };

  const mover = (tipo) => {
    const q = num(mov);
    if (!Number.isInteger(q) || q <= 0) return setMsg('Informe uma quantidade inteira maior que zero.');
    if (tipo === 'sub' && q > estoque) return setMsg(`Retirada maior que o disponível (${estoque}).`);
    setEstoque(tipo === 'add' ? estoque + q : estoque - q);
    setMov('');
    setMsg('');
  };

  return (
    <View style={s.c}>
      <Text style={s.t}>📦 Controle de estoque</Text>
      <TextInput style={s.i} placeholder="Nome do produto" value={nome} onChangeText={setNome} />
      <TextInput style={s.i} placeholder="Quantidade inicial" keyboardType="numeric" value={ini} onChangeText={setIni} />
      <Pressable style={s.b} onPress={iniciar}><Text style={s.bt}>Definir estoque inicial</Text></Pressable>

      {estoque !== null && (
        <View>
          <Text style={s.r}>{nome}: {estoque} unidade(s)</Text>
          {estoque < 5 && <Text style={s.alerta}>⚠️ Estoque baixo: menos de 5 unidades!</Text>}
          <TextInput style={[s.i, { marginTop: 12 }]} placeholder="Quantidade da movimentação" keyboardType="numeric" value={mov} onChangeText={setMov} />
          <Pressable style={s.b} onPress={() => mover('add')}><Text style={s.bt}>Adicionar estoque</Text></Pressable>
          <Pressable style={[s.b, { backgroundColor: '#e67e22' }]} onPress={() => mover('sub')}><Text style={s.bt}>Retirar estoque</Text></Pressable>
        </View>
      )}
      {msg !== '' && <Text style={s.e}>{msg}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#f4f6fb' },
  t: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2a44' },
  i: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  b: { backgroundColor: '#3b6cf6', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  bt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  r: { fontSize: 20, marginTop: 16, color: '#1f2a44', fontWeight: '600' },
  alerta: { backgroundColor: '#fdecea', color: '#c0392b', padding: 10, borderRadius: 8, marginTop: 8, fontWeight: '600' },
  e: { color: '#c0392b', marginTop: 8 },
});