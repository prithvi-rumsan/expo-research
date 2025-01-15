import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [storedItems, setStoredItems] = useState<string[]>([]);

  // Load data from AsyncStorage on app load
  useEffect(() => {
    const loadStoredItems = async () => {
      try {
        const data = await AsyncStorage.getItem("items");
        if (data) setStoredItems(JSON.parse(data));
      } catch (error) {
        Alert.alert("Error", "Failed to load data.");
      }
    };
    loadStoredItems();
  }, []);

  // Save an item to AsyncStorage
  const saveItem = async () => {
    if (!inputValue.trim()) {
      Alert.alert("Validation", "Input cannot be empty.");
      return;
    }
    try {
      const newItems = [...storedItems, inputValue];
      await AsyncStorage.setItem("items", JSON.stringify(newItems));
      setStoredItems(newItems);
      setInputValue("");
    } catch (error) {
      Alert.alert("Error", "Failed to save item.");
    }
  };

  // Remove an item from AsyncStorage
  const removeItem = async (index: number) => {
    try {
      const updatedItems = storedItems.filter((_, i) => i !== index);
      await AsyncStorage.setItem("items", JSON.stringify(updatedItems));
      setStoredItems(updatedItems);
    } catch (error) {
      Alert.alert("Error", "Failed to remove item.");
    }
  };

  // Clear all items from AsyncStorage
  const clearAll = async () => {
    try {
      await AsyncStorage.removeItem("items");
      setStoredItems([]);
    } catch (error) {
      Alert.alert("Error", "Failed to clear items.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Example</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new item"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <TouchableOpacity style={styles.button} onPress={saveItem}>
        <Text style={styles.buttonText}>Save Item</Text>
      </TouchableOpacity>
      <FlatList
        data={storedItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        onPress={clearAll}
      >
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: "#dc3545",
    fontWeight: "bold",
  },
});

export default App;
