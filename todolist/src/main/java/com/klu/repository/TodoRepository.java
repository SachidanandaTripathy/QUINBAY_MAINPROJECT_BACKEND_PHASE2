package com.klu.repository;

import com.klu.model.TodoList;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TodoRepository extends MongoRepository<TodoList,String> {
    boolean existsById(Long id);

    void deleteById(Long id);

    Optional<Object> findById(Long id);
}
