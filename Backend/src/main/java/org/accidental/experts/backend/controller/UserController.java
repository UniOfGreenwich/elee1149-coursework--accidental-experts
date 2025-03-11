package org.accidental.experts.backend.controller;

import org.accidental.experts.backend.entity.User;
import org.accidental.experts.backend.repository.UserRepository;
import org.accidental.experts.backend.utils.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        user.setRegistrationDate(Instant.now());
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Integer> authenticateUser(@RequestBody User user) {
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser.isPresent() &&
                foundUser.get().getPassword().equals(PasswordUtil.hashPassword(user.getPassword()))) {
            return ResponseEntity.ok(foundUser.get().getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}