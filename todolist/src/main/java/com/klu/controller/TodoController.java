package com.klu.controller;

import com.klu.model.TodoList;
import com.klu.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoList addTodo(@RequestBody TodoList todo) {
        return todoService.createTodo(todo);
    }

    @GetMapping
    public List<TodoList> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public Optional<TodoList> getTodoById(@PathVariable String id) {
        return todoService.getTodoById(id);
    }

    @PutMapping("/{id}")
    public TodoList updateTodo(@PathVariable String id, @RequestBody TodoList todo) {
        return todoService.updateTodo(id, todo);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable String id) {
        todoService.deleteTodo(id);
    }
}
