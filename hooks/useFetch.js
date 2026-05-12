// hooks/useFetch.js — Custom hook untuk fetching data 

import { useState, useEffect, useCallback } from 'react'; 
import { ActivityIndicator, FlatList, Text } from 'react-native'; 
  
export function useFetch(fetchFunction, dependencies = []) { 
  const [data, setData]         = useState(null); 
  const [isLoading, setLoading] = useState(true); 
  const [error, setError]       = useState(null); 
  const [refreshKey, setRefresh]= useState(0); 
  
  const refresh = useCallback(() => setRefresh(k => k + 1), []); 
  
  useEffect(() => { 
    let isMounted = true; 
    setLoading(true); 
    setError(null); 
  
    fetchFunction() 
      .then(hasil => { 
        if (isMounted) { 
          setData(hasil); 
          setLoading(false); 
        } 
      }) 
      .catch(err => { 
        if (isMounted) { 
          setError(err.message || 'Terjadi kesalahan'); 
          setLoading(false); 
        } 
      }); 
  
    return () => { isMounted = false; }; 
  }, [refreshKey, ...dependencies]); 
  
  return { data, isLoading, error, refresh }; 
} 
  
// --- Penggunaan di komponen --- 
  
const simulasiFetch = () => new Promise(resolve => 
  setTimeout(() => resolve([ 
    { id: '1', nama: 'Andi', nim: '001' }, 
    { id: '2', nama: 'Sari', nim: '002' }, 
  ]), 1000) 
); 
  
export default function DaftarMahasiswa() { 
  const { data, isLoading, error, refresh } = useFetch(simulasiFetch); 
  
  if (isLoading) return <ActivityIndicator size='large' color='#2E75B6' />; 
  if (error)     return <Text style={{ color: 'red' }}>{error}</Text>; 
  
  return ( 
    <FlatList 
      data={data} 
      keyExtractor={item => item.id} 
      renderItem={({ item }) => <Text>{item.nama}</Text>} 
      onRefresh={refresh} 
      refreshing={isLoading} 
    /> 
  ); 
}