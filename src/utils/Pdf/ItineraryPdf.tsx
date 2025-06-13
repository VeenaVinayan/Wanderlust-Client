import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { TItinerary } from '../../types/packageTypes';
import { PdfProps } from '../../types/packageTypes';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
    backgroundColor: '#fdfdfd',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subheading: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#2e86de',
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
    color: '#444',
  },
  day: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 12,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  }
});
  
 
const ItineraryPdf : React.FC <PdfProps>= ({title,day,night,itinerary}) => ( 
  <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.text}>Duration: {day} Days / {night} Nights</Text>
    </View>

    <View style={[styles.section, { marginTop: 20 }]}>
      <Text style={styles.subheading}>Itinerary</Text>
      {itinerary.map((item: TItinerary, index: number) => (
        <View key={index} style={[styles.day, { marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }]}>
          <Text style={[styles.subheading, { marginBottom: 8 }]}>Day {item.day}</Text>
          <Text style={styles.text}><Text style={styles.label}>Description:</Text> {item.description}</Text>
          <Text style={styles.text}><Text style={styles.label}>Activity:</Text> {item.activities}</Text>
          <Text style={styles.text}><Text style={styles.label}>Meals:</Text> {item.meals.join(', ')}</Text>
          <Text style={styles.text}><Text style={styles.label}>Stay:</Text> {item.stay}</Text>
          <Text style={styles.text}><Text style={styles.label}>Transfer:</Text> {item.transfer}</Text>
        </View>
      ))}
    </View>
  </Page>
</Document>

);

export default ItineraryPdf;
