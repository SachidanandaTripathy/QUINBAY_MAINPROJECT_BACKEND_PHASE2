package com.klu.service;

import com.klu.model.TodoList;
import com.klu.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public TodoList createTodo(TodoList todo) {
        return todoRepository.save(todo);
    }

    public List<TodoList> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<TodoList> getTodoById(String id) {
        return todoRepository.findById(id);
    }

    public TodoList updateTodo(String id, TodoList todo) {
        Optional<TodoList> existingTodo = todoRepository.findById(id);
        if (existingTodo.isPresent()) {
            TodoList updatedTodo = existingTodo.get();
            updatedTodo.setTask(todo.getTask());
            updatedTodo.setCompleted(todo.isCompleted());
            return todoRepository.save(updatedTodo);
        } else {
            throw new RuntimeException("Todo not found");
        }
    }

    public void deleteTodo(String id) {
        todoRepository.deleteById(id);
    }
}
