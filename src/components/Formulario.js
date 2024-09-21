import React, { useState, useEffect } from 'react'
import { Modal, Text,  SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from 'react-native'
import DatePicker from 'react-native-date-picker'

const Formulario = ({ 
    modalVisible, 
    cerrarModal,
    pacientes, 
    setPacientes, 
    //Vid 104 
    paciente: pacienteObj, 
    setPaciente: setPacienteApp
}) => {
    //Vid 104
    const [id, setId]                   = useState('')
    const [paciente, setPaciente]       = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail]             = useState('')
    const [telefono, setTelefono]       = useState('')
    const [fecha, setFecha]             = useState(new Date())
    const [sintomas, setSintomas]       = useState('')

    //Vid 104, siempre lleva un call back 
    useEffect(() => {
        //Si hay un paciente se ejecuta
        if(Object.keys(pacienteObj).length > 0 ) {
            //LLenamos los datos 
            setId              (pacienteObj.id)
            setPaciente        (pacienteObj.paciente)
            setPropietario     (pacienteObj.propietario)
            setEmail           (pacienteObj.email)
            setTelefono        (pacienteObj.telefono)
            setFecha           (pacienteObj.fecha)
            setSintomas        (pacienteObj.sintomas)
        }
    }, [pacienteObj])


    //Vid 96, validaciones 
    const handleCita = () => {
        // Validar, si algunos de ellos estan vacios 
        if([paciente, propietario, email, fecha, sintomas].includes('') ) {
            //Ponemos las alertas 
            Alert.alert(
                 'Error',
                 'Todos los campos son obligatorios'
                //[{text:'Cancelar',style: 'cancel'},{text:'OK'}]
            )
            return
        }

        // Vid 97,Revisar si es un registro nuevo o edición
        const nuevoPaciente = {
            paciente,
            propietario, 
            email,
            telefono, 
            fecha, 
            sintomas
        }

        //Vid  105 , si hay un id, significa qie estamos editando 
        if(id) {
            // Editando
            nuevoPaciente.id = id
            //Hacemos un nuevo arreglo con la modificacion .map nos devuelve un arreglo nuevo 
            //mi variable temporal le llamo pacienteState, comprobamos que tengan el mismo id ,en caso contrario ponemos el nuevo paciente
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)
            //Le pasamos el nuevo paciente
            setPacientes(pacientesActualizados)
            //Despues reseteamos todo a un arreglo vacío
            setPacienteApp({})

        } else {
            //Vid 105,  Nuevo Registro y Vid 93
            nuevoPaciente.id = Date.now()
            setPacientes([...pacientes, nuevoPaciente])
        }
        
        //Reiniciar los campos a vacios
        //Vid 113
        cerrarModal()
        
        setId('')
        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')

    }


    return (
     <Modal
        animationType='slide'
        visible={modalVisible}
      >
        <SafeAreaView style={styles.contenido}>
            <ScrollView>
                <Text
                    style={styles.titulo}//Vid 106 ,revisa si hay un usuario y si hay ponemos Editar y sino nueva
                >{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
                    <Text style={styles.tituloBold}>Cita</Text>
                </Text>

                <Pressable 
                    style={styles.btnCancelar}
                    onLongPress={() => {
                        cerrarModal()
                        //Vid 104, reiniciamos el objeto 
                        setPacienteApp({})
                        setId('')
                        setPaciente('')
                        setPropietario('')
                        setEmail('')
                        setTelefono('')
                        setFecha(new Date())
                        setSintomas('')
                    }}
                >
                    <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </Pressable>


                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Paciente</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Nombre Paciente'
                        placeholderTextColor={'#ECE0EA'}
                        value={paciente}
                        onChangeText={setPaciente}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Propietario</Text>
                    <TextInput 
                    //Vid 92
                        style={styles.input}
                        placeholder='Nombre Propietario'
                        placeholderTextColor={'#ECE0EA'}
                        value={propietario}
                        onChangeText={setPropietario}
                    />
                </View>


                <View style={styles.campo}>
                    <Text style={styles.label}>Email Propietario</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Email Propietario'
                        placeholderTextColor={'#ECE0EA'}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono Propietario</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Teléfono Propietario'
                        placeholderTextColor={'#ECE0EA'}
                        keyboardType='number-pad'
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={10}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta</Text>
                    
                    <View style={styles.fechaContenedor}>
                        <DatePicker 
                        //Vid 93
                            date={fecha}
                            locale='es'
                            onDateChange={ (date) => setFecha(date)}
                        />
                    </View>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Síntomas</Text>
                    <TextInput 
                        style={[styles.input, styles.sintomasInput]}
                        placeholderTextColor={'#ECE0EA'}
                        value={sintomas}
                        onChangeText={setSintomas}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <Pressable 
                //Vid 95
                    style={styles.btnNuevaCita}
                    onPress={handleCita}//Vid 106
                >
                    <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
      </Modal>
    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#22B9E9',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#E756CD',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
        

    },
    label: {
        color: '#FFF',  
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#7672FA',
        padding: 15,
        borderRadius: 10
    },
    sintomasInput: {
        height: 100
    },
    fechaContenedor: {
        backgroundColor: '#7672FA',
        borderRadius: 10
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#E756CD',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNuevaCitaTexto: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    }
})

//Vid 89, exportamos el formulario
export default Formulario
