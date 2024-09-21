import React, { useState } from 'react'
//Vid 86,Importamos el Hook useState
import {
  SafeAreaView,
  View, 
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  //Vid 107
  Alert
} from 'react-native'
//Vid 89
import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {
  //Los Hooks se colocan en la parte superior del componente

  //Vid 87,la funcion que lo modifique le ponemos set, inicia como false 
  const [modalVisible, setModalVisible] = useState(false)
  //Vid 97
  const [pacientes, setPacientes] = useState([])
  //Vid 103
  const [paciente, setPaciente] = useState({})
  //Vid 108
  const [modalPaciente, setModalPaciente] = useState(false)

  //Vid 103
  const pacienteEditar = id => {
    //Vid 103
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id )
    setPaciente(pacienteEditar[0])
  }

  //Vid 107 
  const pacienteEliminar = id => {
      Alert.alert(
        '¿Deseas eliminar este paciente?',
        'Un paciente eliminado no se puede recuperar',
        [
          { text: 'Cancelar' },
          { text: 'Si, Eliminar', onPress: () => {
            //Que sean los pacientes diferentes al que yo elimine 
              const pacientesActualizados = pacientes.filter( pacientesState => pacientesState.id !== id )
              //Hacemos la actualizacion 
              setPacientes(pacientesActualizados)
          }}
        ]
      )
  }

  //Vid 113
  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        //Vid 82
        style={styles.btnNuevaCita}
         //Vid 88 y vid 94, pon lo contrario 
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text
          style={styles.btnTextoNuevaCita}
        >Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? 
          <Text style={styles.noPacientes}>No hay pacientes aún</Text> :
          <FlatList
            //Vid 99
            //Vid 100 
            style={styles.listado}
            data={pacientes}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return(
                  <Paciente 
                    item={item}
                    //Vid 103
                    setModalVisible={setModalVisible}
                    //Vid 109
                    setPaciente={setPaciente}
                    //Vid 103
                    pacienteEditar={pacienteEditar}
                    pacienteEliminar={pacienteEliminar}
                    //Vid 108 
                    setModalPaciente={setModalPaciente}
                  />
              )
            }}
          />
      }


      {modalVisible && (//Vid 112
          <Formulario 
          //Vid 90 y 113
            cerrarModal={cerrarModal}
            //Vid 95
              pacientes={pacientes}
              setPacientes={setPacientes}
              paciente={paciente}
              setPaciente={setPaciente}
          />
      )}
 
      <Modal
      //Vid 108,este modal monta y desmonta el componente
        visible={modalPaciente}
        animationType='slide'
      >
        <InformacionPaciente 
        //Vid 109
          paciente={paciente}
          //Vid 112 
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>

    </SafeAreaView>
  );
};
//Vid 79,creamos la hoja de estilo con instrucciones de CSS
const styles = StyleSheet.create({
  //Contenedor de nuestra app
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    paddingVertical: 40,
    
  },
  titulo: {
      textAlign: 'center',
      fontSize: 30,
      color: '#374151',
      fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
   //Vid 83
  btnNuevaCita: {
    backgroundColor: '#7672FA',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#6D28D9'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
    
  }
})

export default App;