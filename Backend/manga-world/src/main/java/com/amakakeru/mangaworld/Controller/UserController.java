package com.amakakeru.mangaworld.Controller;


import com.amakakeru.mangaworld.Entity.User;
import com.amakakeru.mangaworld.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/getUserById/{userId}")
    public User getUserById(@PathVariable String userId) {
        return userRepository.findUserByUserId(Long.parseLong(userId));
    }

    @DeleteMapping("/users/deleteUser/{userId}")
    public void deleteUser(@PathVariable String userId) {
        User user = userRepository.findUserByUserId(Long.parseLong(userId));
        userRepository.delete(user);
    }

    @PostMapping("/users/searchByName")
    public List<User> searchByName(@RequestBody String keyword) {
        try {
            String decodedString = URLDecoder.decode(keyword, "UTF-8");
            decodedString = decodedString.substring(0, decodedString.length() - 1);
            Pageable pageable = PageRequest.of(0, 10);
            return userRepository.findUsersByNameContainingIgnoreCase(decodedString, pageable);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
