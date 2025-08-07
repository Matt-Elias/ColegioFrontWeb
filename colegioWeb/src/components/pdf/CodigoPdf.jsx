import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { QRCode } from 'react-qr-code';
import LogoColegio from "../../img/LogoColegio.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  qrContainer: {
    margin: 30,
    padding: 10,
    border: '1px solid #E4E4E4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentInfo: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 1.5
  },
  logo: {
    width: 100,
    marginBottom: 20
  },
  qrImage: {
    width: 150,
    height: 150
  }
});

const CodigoPdf = ({ estudianteData, qrImage }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src={LogoColegio} style={styles.logo} /> 
                <View style={styles.header}>
                    <Text>Credencial de Estudiante</Text>
                </View>

                {/**
                 * <View style={styles.qrContainer}>
                    <QRCode 
                    value={JSON.stringify(estudianteData)}
                    size={150}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="H"
                    />
                    </View> 
                 */}

                <View style={styles.qrContainer}>
                  {qrImage && <Image src={qrImage} style={styles.qrImage} />}
                </View> 
                
                <View style={styles.studentInfo}>
                    <Text>ID: {estudianteData.estudiante.idEstudiante}</Text>
                    <Text>Nombre: {estudianteData.nombreCompleto}</Text>
                    <Text>Matrícula: {estudianteData.estudiante.matricula}</Text>
                    <Text>Grupo: {estudianteData.estudiante.gradoGrupo.idGradoGrupo}</Text>
                    <Text>Tipo: {estudianteData.estudiante.tipo}</Text>
                </View>
            </Page>
        </Document>
    );
}

export default CodigoPdf;
