package com.klu.controller;

import com.klu.model.TodoList;
import com.klu.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:8081")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<TodoList> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public TodoList createTodo(@RequestBody TodoList todo) {
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public TodoList updateTodo(@PathVariable String id, @RequestBody TodoList updatedTodo) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(updatedTodo.getTitle()); // Ensure getTitle() exists
                    todo.setCompleted(updatedTodo.isCompleted());
                    return todoRepository.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }


    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Todo not found with id: " + id);
        }
    }
}
