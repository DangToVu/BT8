import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/authSlice';
import { addTodo, updateTodo, deleteTodo } from '../redux/todoSlice';

const TodoListScreen = ({ navigation }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      if (editingTodo) {
        dispatch(updateTodo({ id: editingTodo.id, text: newTodoText }));
      } else {
        dispatch(addTodo({ id: Date.now().toString(), text: newTodoText }));
      }
      setNewTodoText('');
      setEditingTodo(null);
      setIsModalVisible(false);
    }
  };

  const handleEditTodo = (todo) => {
    setNewTodoText(todo.text);
    setEditingTodo(todo);
    setIsModalVisible(true);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Todo List</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <View style={styles.todoActions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleEditTodo(item)}>
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteTodo(item.id)}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter todo"
            value={newTodoText}
            onChangeText={setNewTodoText}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleAddTodo}>
            <Text style={styles.modalButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop:50
  },
  todoItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 18,
    color: '#555',
  },
  todoActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  actionButtonText: {
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TodoListScreen;
