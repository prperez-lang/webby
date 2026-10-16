import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function Index() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales'>('inventory');

  // State Management
  const [records, setRecords] = useState([
    { id: '1', name: 'Haircut & Blowdry', category: 'Hair Care', price: '250', stock: '100' },
    { id: '2', name: 'Full Body Massage', category: 'Spa & Massage', price: '500', stock: '50' },
    { id: '3', name: 'Argan Hair Oil 100ml', category: 'Product Inventory', price: '350', stock: '15' },
  ]);

  const [sales, setSales] = useState<any[]>([]);

  // Form Inputs
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  // Sales Selection
  const [selectedSaleItemId, setSelectedSaleItemId] = useState('');
  const [saleQty, setSaleQty] = useState('1');

  // Dashboard Aggregates
  const totalItems = records.length;
  const totalStock = records.reduce((sum, item) => sum + (parseInt(item.stock) || 0), 0);
  const totalValue = records.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * (parseInt(item.stock) || 0),
    0
  );

  const handleSaveRecord = () => {
    if (!name || !category || !price || !stock) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (editingId) {
      setRecords(
        records.map((item) =>
          item.id === editingId ? { id: editingId, name, category, price, stock } : item
        )
      );
      setEditingId(null);
    } else {
      setRecords([
        ...records,
        { id: Date.now().toString(), name, category, price, stock },
      ]);
    }
    resetForm();
  };

  const handleEditRecord = (item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category);
    setPrice(item.price);
    setStock(item.stock);
  };

  const handleDeleteRecord = (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this record?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setRecords(records.filter((item) => item.id !== id)),
      },
    ]);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
  };

  const handleProcessSale = () => {
    const item = records.find((r) => r.id === selectedSaleItemId);
    const qty = parseInt(saleQty);

    if (!item) {
      Alert.alert('Error', 'Please select an item.');
      return;
    }
    if (isNaN(qty) || qty <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return;
    }
    if (parseInt(item.stock) < qty) {
      Alert.alert('Error', 'Insufficient stock available.');
      return;
    }

    setRecords(
      records.map((r) =>
        r.id === item.id ? { ...r, stock: (parseInt(r.stock) - qty).toString() } : r
      )
    );

    const newSale = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      itemName: item.name,
      quantity: qty,
      total: parseFloat(item.price) * qty,
    };

    setSales([newSale, ...sales]);
    setSaleQty('1');
    setSelectedSaleItemId('');
    Alert.alert('Success', 'Sale logged successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Items</Text>
            <Text style={styles.statValue}>{totalItems}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Stock</Text>
            <Text style={styles.statValue}>{totalStock}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Value</Text>
            <Text style={styles.statValue}>₱{totalValue.toFixed(0)}</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'inventory' && styles.activeTab]}
            onPress={() => setActiveTab('inventory')}
          >
            <Text style={[styles.tabText, activeTab === 'inventory' && styles.activeTabText]}>
              Inventory
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'sales' && styles.activeTab]}
            onPress={() => setActiveTab('sales')}
          >
            <Text style={[styles.tabText, activeTab === 'sales' && styles.activeTabText]}>
              Sales Log
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'inventory' ? (
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{editingId ? 'Edit Item' : 'Add Item'}</Text>
              <TextInput
                style={styles.input}
                placeholder="Item or Service Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Category (e.g. Hair Care, Spa)"
                value={category}
                onChangeText={setCategory}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Price (₱)"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Stock Units"
                  keyboardType="numeric"
                  value={stock}
                  onChangeText={setStock}
                />
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSaveRecord}>
                <Text style={styles.primaryButtonText}>
                  {editingId ? 'Update Record' : 'Save Record'}
                </Text>
              </TouchableOpacity>

              {editingId && (
                <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                  <Text style={styles.cancelButtonText}>Cancel Edit</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Inventory Catalog</Text>
              {records.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemSubtitle}>
                      {item.category} • ₱{parseFloat(item.price).toFixed(2)}
                    </Text>
                    <Text style={styles.stockBadge}>In Stock: {item.stock}</Text>
                  </View>
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleEditRecord(item)}
                    >
                      <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDeleteRecord(item.id)}
                    >
                      <Text style={styles.btnText}>Del</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Record New Transaction</Text>
              <Text style={styles.inputLabel}>Select Item:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
                {records.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.chip,
                      selectedSaleItemId === item.id && styles.activeChip,
                    ]}
                    onPress={() => setSelectedSaleItemId(item.id)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedSaleItemId === item.id && styles.activeChipText,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TextInput
                style={styles.input}
                placeholder="Quantity Sold"
                keyboardType="numeric"
                value={saleQty}
                onChangeText={setSaleQty}
              />

              <TouchableOpacity style={styles.primaryButton} onPress={handleProcessSale}>
                <Text style={styles.primaryButtonText}>Process Sale</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Transaction Logs</Text>
              {sales.length === 0 ? (
                <Text style={styles.emptyText}>No sales logged yet.</Text>
              ) : (
                sales.map((sale) => (
                  <View key={sale.id} style={styles.saleItem}>
                    <View>
                      <Text style={styles.itemTitle}>{sale.itemName}</Text>
                      <Text style={styles.itemSubtitle}>
                        Qty: {sale.quantity} • {sale.timestamp}
                      </Text>
                    </View>
                    <Text style={styles.saleAmount}>+₱{sale.total.toFixed(2)}</Text>
                  </View>
                ))
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  scrollContent: { padding: 16 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#ffffff', padding: 12, borderRadius: 8, marginHorizontal: 4, borderLeftWidth: 4, borderLeftColor: '#3498db' },
  statLabel: { fontSize: 10, color: '#7f8c8d', textTransform: 'uppercase' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  tabContainer: { flexDirection: 'row', marginBottom: 16 },
  tabButton: { flex: 1, paddingVertical: 10, backgroundColor: '#e2e8f0', alignItems: 'center', borderRadius: 6, marginHorizontal: 4 },
  activeTab: { backgroundColor: '#2c3e50' },
  tabText: { color: '#4a5568', fontWeight: '600' },
  activeTabText: { color: '#ffffff' },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#cccccc', borderRadius: 6, padding: 10, marginBottom: 10, fontSize: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  primaryButton: { backgroundColor: '#2c3e50', padding: 12, borderRadius: 6, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontWeight: 'bold' },
  cancelButton: { marginTop: 8, padding: 10, alignItems: 'center' },
  cancelButtonText: { color: '#e74c3c' },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eeeeee' },
  itemTitle: { fontWeight: 'bold', fontSize: 14, color: '#2c3e50' },
  itemSubtitle: { color: '#7f8c8d', fontSize: 12 },
  stockBadge: { color: '#3498db', fontSize: 11, fontWeight: '600' },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  editBtn: { backgroundColor: '#3498db', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4, marginRight: 6 },
  deleteBtn: { backgroundColor: '#e74c3c', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  btnText: { color: '#ffffff', fontSize: 12 },
  inputLabel: { fontSize: 12, color: '#7f8c8d', marginBottom: 6 },
  chip: { backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  activeChip: { backgroundColor: '#3498db' },
  chipText: { fontSize: 12, color: '#333333' },
  activeChipText: { color: '#ffffff' },
  saleItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eeeeee' },
  saleAmount: { fontWeight: 'bold', color: '#2ecc71' },
  emptyText: { color: '#7f8c8d', textAlign: 'center', paddingVertical: 12 },
});