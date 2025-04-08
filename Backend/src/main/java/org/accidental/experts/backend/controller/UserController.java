package org.accidental.experts.backend.controller;

import org.accidental.experts.backend.dto.ChangePasswordDTO;
import org.accidental.experts.backend.dto.UserUpdateDTO;
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

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody UserUpdateDTO updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Integer> authenticateUser(@RequestBody User user) {
        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser.isPresent() &&
                foundUser.get().getPassword().equals(PasswordUtil.hashPassword(user.getPassword()))) {
            return ResponseEntity.ok(foundUser.get().getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Integer id, @RequestBody ChangePasswordDTO changePasswordDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (!user.getPassword().equals(PasswordUtil.hashPassword(changePasswordDTO.getCurrentPassword()))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect.");
            }
            user.setPassword(PasswordUtil.hashPassword(changePasswordDTO.getNewPassword()));
            userRepository.save(user);
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}