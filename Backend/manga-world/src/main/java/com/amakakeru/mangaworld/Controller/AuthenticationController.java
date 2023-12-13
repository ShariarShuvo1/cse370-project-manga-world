package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Authorities;
import com.amakakeru.mangaworld.Entity.User;
import com.amakakeru.mangaworld.Repository.AuthoritiesRepository;
import com.amakakeru.mangaworld.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthoritiesRepository authoritiesRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            User storedUser = userRepository.findUserByEmail(user.getEmail());
            if (BCrypt.checkpw(user.getPassword(), storedUser.getPassword())) {
                storedUser.setPassword(null);
                return ResponseEntity.ok(storedUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong Credential");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User newUser) {
        if (userRepository.existsByEmail(newUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        String hashedPassword = hashPassword(newUser.getPassword());
        newUser.setPassword(hashedPassword);

//        insert into user (email,name,password) values (newUser.getEmail(),newUser.getName(),newUser.getPassword())
        User savedUser = userRepository.save(newUser);

        Authorities authorities = new Authorities();
        authorities.setType("general");
        authorities.setUser(savedUser);
//        insert into authorities (type,user_id) values (authorities.getType(),authorities.getUser().getUserId())
        authoritiesRepository.save(authorities);

        savedUser.setPassword(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
