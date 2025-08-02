import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TBookingPdfProps } from '../../types/bookingTypes';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10
  },
  headerLeft: {
    width: '50%',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  headerRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '45%'
  },
  invoiceLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a'
  },
  section: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: '32%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  text: {
    marginBottom: 4
  },
  label: {
    fontWeight: 'bold'
  },
  billingTable: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 6
  },
  billingHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  billingCell: {
    width: '33%',
    textAlign: 'left'
  },
  footer: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    textAlign: 'center'
  }
});

const generateInvoiceNumber = (): string => {
   const array = new Uint8Array(4); 
   window.crypto.getRandomValues(array);
   const randomHex = Array.from(array, byte =>
     byte.toString(16).padStart(2, '0')
   ).join('').toUpperCase();
   const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
   return `INV-${date}-${randomHex}`; 
};

const InvoicePdf: React.FC<TBookingPdfProps> = (booking : TBookingPdfProps ) => {
  const childPrice = booking.children * Math.floor(0.5 * booking.price);
  const adultPrice = booking.adult * booking.price;
  const total = adultPrice + childPrice;
  const invoiceNumber = generateInvoiceNumber();
  const billingDate = new Date(booking.bookingDate).toLocaleDateString();
  return (
   
  <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.headerSection}>
      <View style={styles.headerLeft}>
        <Text style={styles.logoText}>Wanderlust Travels</Text>
        <Text style={styles.text}>Kochi</Text>
        <Text style={styles.text}>Phone: +91 9995412362</Text>
        <Text style={styles.text}>Website: www.wanderlust.com</Text>
      </View>
   
      <View style={styles.headerRight}>
        <Text style={styles.invoiceLabel}>INVOICE</Text>
        <Text style={styles.text}><Text style={styles.label}>Invoice No:</Text> {invoiceNumber}</Text>
        <Text style={styles.text}><Text style={styles.label}>Date:</Text> {billingDate}</Text>
      </View>
    </View>

    <View style={styles.section}>
      <Text style={styles.title}>Customer Details</Text>
      <Text style={styles.text}><Text style={styles.label}>Name:</Text> {booking.name}</Text>
      <Text style={styles.text}><Text style={styles.label}>Email:</Text> {booking.email}</Text>
      <Text style={styles.text}><Text style={styles.label}>Phone:</Text> {booking.phone}</Text>
    </View>

   
    <View style={styles.section}>
      <Text style={styles.title}>Package Details</Text>
      <Text style={styles.text}><Text style={styles.label}>Title:</Text> {booking.title}</Text>
      <Text style={styles.text}><Text style={styles.label}>Duration:</Text> {booking.day} Days / {booking.night} Nights</Text>
      <Text style={styles.text}><Text style={styles.label}>Price:</Text> ₹{booking.price}</Text>
      <Text style={styles.text}><Text style={styles.label}>Trip Date:</Text> {new Date(booking.tripDate)?.toString() || ''}</Text>
      <Text style={styles.text}><Text style={styles.label}>Booking Date:</Text> {new Date(booking.bookingDate)?.toString() || ''}</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.title}>Billing Summary</Text>
      <View style={styles.billingTable}>
        <View style={[styles.billingRow, styles.billingHeader]}>
          <Text style={styles.billingCell}>Category</Text>
          <Text style={styles.billingCell}>Count</Text>
          <Text style={styles.billingCell}>Amount</Text>
        </View>
        <View style={styles.billingRow}>
          <Text style={styles.billingCell}>Adult</Text>
          <Text style={styles.billingCell}>{booking.adult}</Text>
          <Text style={styles.billingCell}>{booking.adult * booking.price}</Text>
        </View>
        <View style={styles.billingRow}>
          <Text style={styles.billingCell}>Children (50%)</Text>
          <Text style={styles.billingCell}>{booking.children}</Text>
          <Text style={styles.billingCell}>{booking.children * 0.5 * booking.price}</Text>
        </View>
        <View style={styles.billingRow}>
          <Text style={styles.billingCell}>Infants (Free)</Text>
          <Text style={styles.billingCell}>{booking.infant}</Text>
          <Text style={styles.billingCell}>0</Text>
        </View>
        <View style={styles.billingRow}>
          <Text style={[styles.billingCell, { fontWeight: 'bold' }]}>Total</Text>
          <Text style={styles.billingCell}></Text>
          <Text style={[styles.billingCell, { fontWeight: 'bold' }]}>{total}</Text>
        </View>
      </View>
    </View>

   <View style={styles.footer}>
      <Text>Thank you for choosing Wanderlust. Have a wonderful journey!</Text>
    </View>
  </Page>
</Document>

  );
};

export default InvoicePdf;
